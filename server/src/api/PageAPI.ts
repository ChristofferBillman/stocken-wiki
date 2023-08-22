import { Request, Response, Application } from 'express'
import Page, { IPage } from '../models/Page'

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

    // POST
    app.post(BASEURL + '/', async (req, res) => {
        try {
            const { content, infoSection, meta } = req.body
            const newPage: IPage = new Page({
                content,
                infoSection,
                meta
            })
            const createdPage: IPage = await newPage.save()
            res.status(201).json(createdPage)
        } catch (error) {
            res.status(500).send('An error occurred')
        }
    })

    // PUT
    app.put(BASEURL + '/:id', async (req, res) => {
        try {
            const pageId = req.params.id
            const { content, infoSection, meta } = req.body

            const updatedPage: IPage | null = await Page.findByIdAndUpdate(
                pageId,
                { content, infoSection, meta },
                { new: true }
            )

            if (!updatedPage) {
                return res.status(404).send('Page not found')
            }

            res.json(updatedPage)
        } catch (error) {
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