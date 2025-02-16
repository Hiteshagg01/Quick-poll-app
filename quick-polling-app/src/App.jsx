import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"

const API_URL = "https://quick-poll-app-z1q5.onrender.com";

const App = () => {
    const [polls, setPolls] = useState([]);
    const [selectedPoll, setSelectedPoll] = useState(null);
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState(["", ""]);

    useEffect(() => {
        fetchPolls();
    }, []);

    useEffect(() => {
        if (selectedPoll?.poll.id) {
            const interval = setInterval(
                () => fetchPollDetails(selectedPoll.poll.id),
                5000
            );
            return () => clearInterval(interval);
        }
    }, [selectedPoll]);

    const fetchPolls = async () => {
        try {
            const response = await axios.get(`${API_URL}/polls`);
            setPolls(response.data);
        } catch (error) {
            console.error("Error fetching polls:", error);
        }
    };

    const createPoll = async () => {
        try {
            await axios.post(`${API_URL}/polls`, { question, options });
            setQuestion("");
            setOptions(["", ""]);
            fetchPolls();
        } catch (error) {
            console.error("Error creating poll:", error);
        }
    };

    const fetchPollDetails = async (id) => {
        if (!id) return;
        try {
            const response = await axios.get(`${API_URL}/polls/${id}`);
            setSelectedPoll(response.data);
        } catch (error) {
            console.error("Error fetching poll details:", error);
        }
    };

    const vote = async (optionId) => {
        if (!selectedPoll.poll.id) return;
        try {
            await axios.post(`${API_URL}/polls/${selectedPoll.poll.id}/vote`, {
                optionId,
            });
            fetchPollDetails(selectedPoll.poll.id);
        } catch (error) {
            console.error("Error voting:", error);
        }
    };

    return (
        <div className="app-container">
            <h1 className="app-title">Quick Polling App</h1>

            <div className="poll-creation">
                <h2>Create Poll</h2>
                <input
                    type="text"
                    className="input-field"
                    placeholder="Enter your question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                {options.map((opt, idx) => (
                    <input
                        key={idx}
                        type="text"
                        className="input-field"
                        placeholder={`Option ${idx + 1}`}
                        value={opt}
                        onChange={(e) => {
                            const newOptions = [...options];
                            newOptions[idx] = e.target.value;
                            setOptions(newOptions);
                        }}
                    />
                ))}
                <button
                    className="button add-option"
                    onClick={() => setOptions([...options, ""])}
                >
                    Add Option
                </button>
                <button className="button create-poll" onClick={createPoll}>
                    Create Poll
                </button>
            </div>

            <div className="poll-list">
                <h2>Polls</h2>
                <ul>
                    {polls.map((poll) => (
                        <li
                            key={poll.id}
                            className="poll-item"
                            onClick={() => fetchPollDetails(poll.id)}
                        >
                            {poll.question}
                        </li>
                    ))}
                </ul>
            </div>

            {selectedPoll && (
                <div className="poll-details">
                    <h2>{selectedPoll.poll.question}</h2>
                    {selectedPoll.options?.map((option) => (
                        <button
                            key={option.id}
                            className="button vote-button"
                            onClick={() => vote(option.id)}
                        >
                            {option.option_text} ({option.votes} votes)
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default App;
