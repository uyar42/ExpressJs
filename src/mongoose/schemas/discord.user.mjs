import mongoose, { Schema } from "mongoose";

const DiscordUserSchema = new Schema({
  username: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },

  discordId: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  locale: {
    type: mongoose.Schema.Types.String,
  },
});

export const DiscordUser = mongoose.model("DiscordUser", DiscordUserSchema);
