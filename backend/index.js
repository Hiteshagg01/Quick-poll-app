import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Supabase client
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

app.get("/polls", async (req, res) => {
    try {
        const { data, error } = await supabase.from("polls").select("*");

        if (error) throw error;

        return res.json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

app.post("/polls", async (req, res) => {
    const { question, options } = req.body;

    if (!question || !options) {
        return res
            .status(400)
            .json({ error: "Questions and options both are required" });
    }

    try {
        const { data, error: pollError } = await supabase
            .from("polls")
            .insert([{ question }])
            .select()
            .single();

        if (pollError) throw pollError;

        const pollId = data.id;

        const optionsData = options.map((option) => ({
            poll_id: pollId,
            option_text: option,
        }));

        const { error: optionError } = await supabase
            .from("options")
            .insert(optionsData);

        if (optionError) throw optionError;

        res.status(201).json({ message: "Poll Created", pollId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/polls/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const { data: poll, error: pollError } = await supabase
            .from("polls")
            .select("*")
            .eq("id", id)
            .single();

        if (pollError) throw pollError;

        const { data: options, error: optionsError } = await supabase
            .from("options")
            .select("*")
            .eq("poll_id", id);

        if (optionsError) throw optionsError;

        res.json({ poll, options });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/polls/:id/vote", async (req, res) => {
    const { optionId } = req.body;

    try {
        const { data, error: fetchError } = await supabase
            .from("options")
            .select("votes")
            .eq("id", optionId)
            .single();

        if (fetchError) throw fetchError;

        const newVotes = data.votes + 1;
        const { error: updateError } = await supabase
            .from("options")
            .update({ votes: newVotes })
            .eq("id", optionId);

        if (updateError) throw updateError;

        res.json({ message: "Vote recorded", newVotes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/polls/:id/results", async (req, res) => {
    const { id } = req.params;

    try {
        const { data, error } = await supabase
            .from("options")
            .select("id, option_text, votes")
            .eq("poll_id", id);

        if (error) throw error;

        if (data.length === 0) {
            return res.status(404).json({ error: "Poll not found" });
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
