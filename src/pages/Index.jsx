import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Sparkles, RefreshCw } from "lucide-react";

const challenges = [
  { question: "What sound does a cow make?", answer: "moo" },
  { question: "If you're not a robot, type 'I am human' backwards:", answer: "namuh ma i" },
  { question: "What's 2 + 2, but spelled out?", answer: "four" },
  { question: "Type the third word of this sentence:", answer: "third" },
  { question: "What color is the sky on a clear day?", answer: "blue" },
  { question: "How many fingers does a human typically have?", answer: "10" },
  { question: "What's the opposite of 'hello'?", answer: "goodbye" },
  { question: "Type 'robot' using only numbers (hint: think of a phone keypad):", answer: "76268" },
  { question: "What's the name of Earth's natural satellite?", answer: "moon" },
  { question: "If you're human, type 'beep boop' without the space:", answer: "beepboop" },
];

const Index = () => {
  const [currentChallenge, setCurrentChallenge] = useState(getRandomChallenge());
  const [userAnswer, setUserAnswer] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  function getRandomChallenge() {
    return challenges[Math.floor(Math.random() * challenges.length)];
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (userAnswer.toLowerCase().trim() === currentChallenge.answer) {
      setIsVerified(true);
      toast.success("Verification successful! You're not a robot!");
    } else {
      toast.error("Incorrect answer. Are you sure you're not a robot?");
      setCurrentChallenge(getRandomChallenge());
      setUserAnswer('');
    }
  }

  function handleReset() {
    setIsVerified(false);
    setCurrentChallenge(getRandomChallenge());
    setUserAnswer('');
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Prove You're Not a Robot</h1>
      <Card className="p-6 max-w-md mx-auto">
        {!isVerified ? (
          <form onSubmit={handleSubmit}>
            <p className="text-lg mb-4">{currentChallenge.question}</p>
            <Input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Your answer"
              className="mb-4"
            />
            <Button type="submit" className="w-full">
              <Sparkles className="mr-2 h-4 w-4" /> Verify
            </Button>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-xl mb-4">Congratulations! You've proven you're human.</p>
            <Button onClick={handleReset} className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Try Another Challenge
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Index;
