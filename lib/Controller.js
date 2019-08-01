const router = Router()
router.post(
    "/",
    ValidateRequest({
        body: {
            type: "object",
            properties: {},
            required: []
        }
    }),
    (req, res) => {
        NewModel.save(req.body, res.callback)
    }
)
router.put(
    "/:id",
    ValidateRequest({
        params: {
            type: "object",
            properties: {
                id: {
                    type: "string"
                }
            },
            required: ["id"]
        }
    }),
    (req, res) => {
        NewModel.updateOneById(req.body, req.params.id, res.callback)
    }
)
router.delete("/", (req, res) => {
    NewModel.deleteAll(res.callback)
})
router.post(
    "/search",
    ValidateRequest({
        body: {
            type: "object",
            properties: {
                page: {
                    type: "integer"
                },
                limit: {
                    type: "integer"
                },
                data: {
                    type: "object"
                }
            }
        }
    }),
    (req, res) => {
        NewModel.search(req.body, res.callback)
    }
)
export default router
