"use server"

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose"
import { model } from "mongoose";
import { auth } from "@clerk/nextjs/server";
import { text } from "stream/consumers";

interface Params {
    text: string,
    author: string,
    communityId: string | null,
    path: string
}

export async function createThread({text, author, communityId, path}: Params) {
    try{
        connectToDB();

        const createdThread = await Thread.create({text, author, community: null});

        // Update user model
        await User.findByIdAndUpdate(author, { $push: { threads: createdThread._id } });

        revalidatePath(path);
    }
    catch(err : any){
        console.error(`Error creating thread: ${err.message}`);
    }
}

export async function fetchThreads(pageNumber = 1, pageSize = 20) {
    try{
        connectToDB();

        //Calculate the number of threads to skip
        const skipAmount = pageSize * (pageNumber - 1);

        //Fetch threads that have no parents (top-level threads)
        const threadsQuery = Thread.find({parentId: {$in: [null, undefined]}})
        .sort({createdAt: 'desc'})
        .skip(skipAmount)
        .limit(pageSize)
        .populate({path: 'author', model: User})
        .populate({
            path: 'children',
            populate: {
                path: 'author',
                model: User,
                select: '_id name parentId image'
            }
        });

        const totalThreadsCount = await Thread.countDocuments({parentId: {$in: [null, undefined]}});

        const threads = await threadsQuery.exec();

        const isNext = totalThreadsCount > skipAmount + threads.length;

        return {threads, isNext};
    }
    catch(err : any){
        console.error(`Error fetching threads: ${err.message}`);
    }
}

export async function fetchThreadById(id: string) {
    try{
        connectToDB();

        //Todo - populate author and community
        const thread = await Thread.findById(id)
        .populate({
            path: 'author',
            model: User,
            select: '_id id name image'
        })
        .populate({
            path: 'children',
            populate: [
                {
                    path: 'author',
                    model: User,
                    select: '_id name parentId image'
                },
                {
                    path: 'children',
                    model: Thread,
                    populate: {
                        path: 'author',
                        model: User,
                        select: '_id name parentId image'
                    }
                }
            ]
        })

        return thread;
    }
    catch(err : any){
        console.error(`Error fetching thread by id: ${err.message}`);
    }
}

export async function addCommentToThread(
    threadId: string,
    commentText: string,
    userId: string,
    path: string
) {
    //adding a comment to a thread

    try{
        connectToDB();

        //Find the original thread
        const originalThread = await Thread.findById(threadId);

        if(!originalThread) throw new Error('Thread not found');

        const createdThread = new Thread({
            text: commentText,
            author: userId,
            parentId: threadId
        });

        //Save the new thread
        const savedCreatedThread = await createdThread.save();

        //Update the original thread to include the new comment
        originalThread.children.push(savedCreatedThread._id);

        await originalThread.save();

        revalidatePath(path);
    }
    catch(err : any){
        console.error(`Error adding comment to thread: ${err.message}`);
    }
}