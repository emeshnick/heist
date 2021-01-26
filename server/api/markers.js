const router = require("express").Router();
const { Conversation, Marker } = require("../db/models");
module.exports = router;

router.get("/:markerId", async (req, res, next) => {
  try {
    const marker = await Marker.findByPk(req.params.markerId);
    res.json(marker);
  } catch (err) {
    next(err);
  }
});

router.get("/conversation/:conversationId", async (req, res, next) => {
  try {
    const group = await Conversation.findByPk(req.params.conversationId, {
      include: {
        model: Marker,
      },
    });
    const markers = group.markers;
    res.json(markers);
  } catch (err) {
    next(err);
  }
});

router.put("/:conversationId", async (req, res, next) => {
  try {
    const newMarker = await Marker.create(req.body.marker);
    res.json(newMarker);
  } catch (err) {
    next(err);
  }
});

router.delete("/:markerId", async (req, res, next) => {
  try {
    const deletedMarker = await Marker.findByPk(req.params.markerId);
    await deletedMarker.destroy();
    res.json("Marker deleted");
  } catch (err) {
    next(err);
  }
});
