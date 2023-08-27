import Page, { IPage } from "../models/Page";
import { Application } from "express";
import PageRecord, {IPageRecord} from "../models/PageRecord";
import mongoose from 'mongoose'

export default function PageHistoryAPI(app: Application, BASEURL: string) {

	// GET
	app.get(BASEURL + '/:id', async (req, res) => {
		try {
			const pageId = req.params.id

			const history: IPageRecord[] = await PageRecord
				.find({'page._id': new mongoose.Types.ObjectId(pageId)})
				.sort({time: 'desc'})

			res.json(history)
		} catch (error) {
			res.status(500).send('An error occurred')
		}
	})

	// GET
	app.get(BASEURL + '/:id/:revision', async (req, res) => {
		try {
			const pageId = req.params.id
			const revision = req.params.revision

			const record: any = await PageRecord.findOne({'page._id': new mongoose.Types.ObjectId(pageId), versionNumber: revision})

			res.json(record)
		} catch (error) {
			res.status(500).send('An error occurred')
		}
	})
}