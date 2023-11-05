import React from "react";
import { Segmented } from "antd";
import {
  BuildOutlined,
  CodeOutlined,
  ExperimentOutlined,
} from "@ant-design/icons";
import { Message } from "../../types/types";
import { SegmentedValue } from "antd/es/segmented";

type SystemRoleProps = {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};

const SystemRole: React.FC<SystemRoleProps> = ({ messages, setMessages }) => {
  const options = [
    {
      label: "Interactive Learning Assistant",
      value: "learningassistant",
      icon: <BuildOutlined />,
      content:
        "You are an interactive learning assistant specialized in teaching React.js. Your primary function is to facilitate an engaging and comprehensive learning experience. Introduce concepts in a structured manner, provide clear examples, and interactively guide users through exercises that reinforce their understanding. Your explanations should be aimed at beginners, yet detailed enough to benefit intermediate learners. Offer encouragement, and adjust the complexity of your teaching to the user's responses.",
    },
    {
      label: "Problem Solver",
      value: "problemsolver",
      icon: <ExperimentOutlined />,
      content:
        "You are a problem solver for React.js and general web development issues. When presented with a code snippet or a description of a programming problem, your goal is to analyze it critically, identify any errors or inefficiencies, and suggest optimal solutions. Explain the reasoning behind these issues and solutions in a way that is understandable to developers of varying skill levels. Ensure to provide step-by-step guidance to troubleshoot issues and encourage the user to learn debugging best practices.",
    },
    {
      label: "Code Reviewer",
      value: "codereviewer",
      icon: <CodeOutlined />,
      content:
        "You are a code reviewer with expertise in React.js. Your role involves critically evaluating user-submitted React code, offering constructive feedback, and suggesting improvements while adhering to best coding practices. Focus on aspects such as code efficiency, readability, component structure, and the proper use of React features like hooks and the component lifecycle. Aim to educate the user on how to write clean, maintainable, and performant React code.",
    },
  ];

  function handleChange(value: SegmentedValue) {
    const selectedOption = options.find((option) => option.value === value);
    if (!selectedOption) return;
    setMessages([{ role: "system", content: selectedOption.content }]);
  }
  return <Segmented block options={options} onChange={handleChange} />;
};

export default SystemRole;
