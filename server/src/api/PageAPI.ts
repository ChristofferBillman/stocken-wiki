import { Request, Response, Application } from 'express'
import Page, { IPage } from '../models/Page'
import PageRecord, { IPageRecord } from "../models/PageRecord";
import User from "../models/User";
import mongoose from "mongoose";

export default function PageAPI(app: Application, BASEURL: string) {

    // GET
    app.get(BASEURL + '/',  async (req, res) => {
        try {
            const pages: IPage[] = await Page.find()
            res.json(pages)
        } catch (error) {
            res.status(500).send('An error occurred' )
        }
    })

    // GET
    app.get(BASEURL + '/:id',  async (req, res) => {
        try {
           // await new Promise((resolve) => setTimeout(() => resolve(2), 5000));
            const pageId = req.params.id
            const page: IPage[] = await Page.findById(pageId)
            res.json(page)
        } catch (error) {
            res.status(500).send('An error occurred' )
        }
    })

    // POST
    app.post(BASEURL + '/', async (req, res) => {
        try {
            const { content, infoSection, authors } = req.body
            console.log(authors)
            addAuthorIfNotPresent(req.userId, authors)

            const newPage: IPage = new Page({
                content,
                infoSection,
                authors
            })

            console.log('hi')
            const createdPage: IPage = await newPage.save()
            res.status(201).json(createdPage)
        } catch (error) {
            console.log(error)
            res.status(500).send('An error occurred')
        }
    })

    // PUT
    app.put(BASEURL + '/:id', async (req, res) => {
        try {
            const pageId = req.params.id
            const { content, infoSection, authors } = req.body

            addAuthorIfNotPresent(req.userId, authors)

            const updatedPage: IPage | null = await Page.findByIdAndUpdate(
                pageId,
                { content, infoSection, authors },
                { new: true }
            )

            if (!updatedPage) {
                return res.status(404).send('Page not found')
            }

            const numberOfRecords = await PageRecord.count({'page._id': new mongoose.Types.ObjectId(pageId)})

            await new PageRecord({
                page: updatedPage,
                versionNumber: numberOfRecords,
                time: Date.now(),
                author: req.userId
            }).save()

            res.json(updatedPage)
        } catch (error) {
            console.log(error)
            res.status(500).send('An error occurred')
        }
    })

    // DELETE
    app.delete(BASEURL + '/:id', async (req, res) => {
        try {
            const pageId = req.params.id

            const deletedPage: IPage | null = await Page.findByIdAndDelete(pageId)

            if (!deletedPage) {
                return res.status(404).send('Page not found')
            }

            res.json({ message: 'Page deleted.' })
        } catch (error) {
            res.status(500).send('Something went wrong when deleting post.')
        }
    })
}

function addAuthorIfNotPresent(userId, authors: any) {
    if(!authors.includes(userId)) {
        authors.push(userId)
    }
}