export type ApprovalRiskLevel = "low" | "medium" | "high";

export type ApprovalRequest = {
  id: string;
  title: string;
  description: string;
  riskLevel: ApprovalRiskLevel;
  actionName: string;
};
