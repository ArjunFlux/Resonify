const mongoose = require("mongoose");
const MusicIntoPlaylistSchema = mongoose.Schema(
  {
    SongDetailsInDataBase: {
      type: Object,
      required: true,
    },
    NameOfPlaylistInDataBase: {
      type: Object,
      required: true,
    },
  },
  { timestamp: true },
);
const MusicIntoPlaylistModel = mongoose.model("MusicIntoPlaylistmodel",MusicIntoPlaylistSchema,);
module.exports = MusicIntoPlaylistModel;
