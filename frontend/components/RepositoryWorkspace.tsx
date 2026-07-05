"use client";

import { useEffect, useState } from "react";

import {
  getRepositoryTree,
  getFileContent,
  explainFile,
  reviewFile,
  generateTests,
  optimizeCode,
  reviewEntireRepository,
} from "@/lib/api";

import FileTree, { TreeNode } from "./FileTree";
import MonacoViewer from "./MonacoViewer";
import ChatPanel from "./ChatPanel";
import AIActions from "./AIActions";
import AIAssistant from "./AIAssistant";
import Breadcrumb from "./Breadcrumb";

export default function RepositoryWorkspace() {
  const [tree, setTree] = useState<TreeNode[]>([]);

  const [selectedFile, setSelectedFile] = useState("");

  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(false);

  const [aiResult, setAIResult] = useState("");

  const [error, setError] = useState("");

  const [currentAction, setCurrentAction] = useState("");

  useEffect(() => {
    async function loadTree() {
      try {
        const response = await getRepositoryTree();

        setTree(response.tree);
      } catch (err) {
        console.error(err);
      }
    }

    loadTree();
  }, []);

  useEffect(() => {
    async function loadFile() {
      if (!selectedFile) return;

      try {
        const response = await getFileContent(selectedFile);

        setContent(response.content);

        setAIResult("");

        setError("");

        setCurrentAction("");
      } catch (err) {
        console.error(err);
      }
    }

    loadFile();
  }, [selectedFile]);

  const fileName =
    selectedFile.split(/[/\\]/).pop() || "";

  async function executeAI(
    fn: (file: string, code: string) => Promise<any>,
    action: string
  ) {
    if (!content) return;

    try {
      setLoading(true);

      setError("");

      setCurrentAction(action);

      const response = await fn(fileName, content);

      setAIResult(response.answer);
    } catch (err) {
      console.error(err);

      setError("Unable to contact Gemini.");

      setAIResult("");
    } finally {
      setLoading(false);
    }
  }

  async function executeRepositoryReview() {
    try {
      setLoading(true);

      setError("");

      setCurrentAction("Repository Review");

      const response = await reviewEntireRepository();

      setAIResult(response.answer);
    } catch (err) {
      console.error(err);

      setError("Repository review failed.");

      setAIResult("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-12 space-y-8">

      <Breadcrumb path={selectedFile} />

      <div className="grid grid-cols-12 gap-8">

        <div className="col-span-3">

          <FileTree
            data={tree}
            selectedFile={selectedFile}
            onFileSelect={setSelectedFile}
          />

        </div>

        <div className="col-span-9 space-y-6">

          <AIActions
            loading={loading}
            onExplain={() =>
              executeAI(
                explainFile,
                "Explain"
              )
            }
            onReview={() =>
              executeAI(
                reviewFile,
                "Review"
              )
            }
            onTests={() =>
              executeAI(
                generateTests,
                "Generate Tests"
              )
            }
            onOptimize={() =>
              executeAI(
                optimizeCode,
                "Optimize"
              )
            }
            onRepositoryReview={executeRepositoryReview}
          />

          <MonacoViewer
            fileName={fileName}
            content={content}
          />

          <AIAssistant
            loading={loading}
            result={aiResult}
            error={error}
            action={currentAction}
            onClear={() => {
              setAIResult("");
              setError("");
              setCurrentAction("");
            }}
          />

        </div>

      </div>

      <ChatPanel />

    </div>
  );
}