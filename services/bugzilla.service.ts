import { Request, Response } from 'express'
import { ICreateBug } from "../interfaces/Bugs";
import { CreateBugSchemaValidator } from "../utils/validator";
import { logger } from "../shared/logger";
import GetHttpRequest from "../utils/HttpRequest";



class CreateBugService {

    constructor() {
        this.createBug = this.createBug.bind(this);
    }


    async createBug(req: Request, res: Response) {
        const data: ICreateBug = {
            product: req.body.product,
            component: req.body.component,
            version: req.body.version,
            summary: req.body.summary,
            alias: req.body.alias,
            op_sys: req.body.op_sys,
            rep_platform: req.body.rep_platform
        }

        try {
            const error = CreateBugSchemaValidator(data)

            if (error) throw new Error(`Invalid payload:${error}`)

            const postInstance = new GetHttpRequest({ url: "/rest/bug", method: 'post', headers: { "X-BUGZILLA-API-KEY": process.env.API_KEY }, data: data })

            const response = await postInstance.send()


            console.log(response)

            return res.status(200).json({ success: true, data: response.data })

        } catch (error: any) {
            logger.error(error)
            return res.status(500).json({ error: true, message: error || 'Something went wrong' })

        }
    }


    async getBug(_req: Request, res: Response) {
        try {

            const getInstance = new GetHttpRequest({ url: "/rest/bug", method: 'get', headers: { "X-BUGZILLA-API-KEY": process.env.API_KEY } })

            const response = await getInstance.send()

            return res.status(200).json({ success: true, data: response.data })

        } catch (error: any) {
            logger.error(error)
            return res.status(500).json({ error: true, message: error?.message || 'Something went wrong' })

        }
    }


    async updateBug(req: Request, res: Response) {
        try {

            const getInstance = new GetHttpRequest({ url: `/rest/bug${req.params.id}`, method: 'put', headers: { "X-BUGZILLA-API-KEY": process.env.API_KEY } })

            const response = await getInstance.send()

            return res.status(200).json({ success: true, data: response.data })

        } catch (error: any) {
            logger.error(error)
            return res.status(500).json({ error: true, message: error?.message || 'Something went wrong' })

        }
    }



}

export default CreateBugService