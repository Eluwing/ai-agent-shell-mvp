import { END, START, StateGraph } from "@langchain/langgraph";

type AgentState = {
  goal: string;
  nextAction?: string;
};

export function createPreviewGraph() {
  return new StateGraph<AgentState>({
    channels: {
      goal: null,
      nextAction: null,
    },
  })
    .addNode("plan", (state) => ({
      nextAction: `Inspect the active ${state.goal} workspace`,
    }))
    .addEdge(START, "plan")
    .addEdge("plan", END)
    .compile();
}
