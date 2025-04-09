"use client"

import { useEffect, useRef } from "react"

interface MLArchitectureDiagramProps {
  className?: string
}

export function MLArchitectureDiagram({ className }: MLArchitectureDiagramProps) {
  const diagramRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadMermaid = async () => {
      try {
        const mermaid = (await import("mermaid")).default

        mermaid.initialize({
          startOnLoad: true,
          theme: "dark",
          securityLevel: "loose",
          themeVariables: {
            primaryColor: "#6366f1",
            primaryTextColor: "#ffffff",
            primaryBorderColor: "#4f46e5",
            lineColor: "#94a3b8",
            secondaryColor: "#0ea5e9",
            tertiaryColor: "#2dd4bf",
          },
        })

        const diagram = `
        graph TD
          A["Input / Trigger"] --> B("Orchestrator");

          %% Data Gathering & Prep Stages
          B --> C{"Query Generation"};
          A --> C;
          D["Database / Structured Data"] --> C;
          D -- "Context / Structured Data" --> B;

          C --> E{"Web Search Module"};
          E -- "Raw Text" --> B;

          B -- "Raw Text + Context" --> F{"LLM (LLaMA) Module"};
          %% LLM provides processed info, potentially including text embeddings suitable for NNs
          F -- "Processed Info" --> B;

          B -- "Processed Info + Structured Data" --> G{"Feature Engineering"};
          %% Feature Engineering creates features usable by various models
          G -- "Combined Features" --> B;

          %% Model Inference Section - Enhanced
          subgraph "Model Serving Environment"
              H_Router{"Model Router / Selector"};
              subgraph "Model Endpoints"
                  H1["Neural Network Serving (NN)"];
                  H2["Tree-Based Model Serving (e.g., XGBoost)"];
                  H_Other["Other ML Model Serving (e.g., Linear, SVM)"];
              end
              H_Ensemble{"Ensemble / Aggregation Logic"};
              H_ModelManager{"Model Manager"}; %% New: Manage model versions, monitoring, and selection

              %% Conceptual Internal Flow
              H_Router --> H1;
              H_Router --> H2;
              H_Router --> H_Other;
              H1 --> H_Ensemble;
              H2 --> H_Ensemble;
              H_Other --> H_Ensemble;
          end

          %% Orchestrator sends features to the environment, specifying task/model type
          B -- "Combined Features + Task Info" --> H_Router;
          %% The environment returns the final prediction (potentially ensembled)
          H_Ensemble -- "Final Prediction(s)" --> B; %% Ensemble output goes back to B
          H1 -- "Single Prediction" --> B; %% Or single model output if no ensemble
          H2 -- "Single Prediction" --> B;
          H_Other -- "Single Prediction" --> B;

          %% Output and Explanation Stages
          B -- "Final Prediction(s)" --> I{"Output Module"};

          subgraph "Optional Explanation Generation"
              %% Explanation uses final prediction + original context
              B -- "Final Prediction(s) + Raw Text + Context" --> F;
              F -- "Explanation" --> B;
              B -- "Explanation" --> I;
          end

          I --> J["Final Output / Store Results"];

          classDef orchestrator fill:#6366f1,stroke:#4f46e5,color:#ffffff;
          classDef llm fill:#0ea5e9,stroke:#0284c7,color:#ffffff;
          classDef feature fill:#2dd4bf,stroke:#14b8a6,color:#ffffff;
          classDef model fill:#f59e0b,stroke:#d97706,color:#ffffff;
          classDef output fill:#10b981,stroke:#059669,color:#ffffff;

          class B orchestrator;
          class F llm;
          class G feature;
          class H_Router,H1,H2,H_Other,H_Ensemble,H_ModelManager model;
          class I,J output;
        `

        if (diagramRef.current) {
          diagramRef.current.innerHTML = ""
          mermaid.render("mermaid-diagram", diagram).then((result) => {
            if (diagramRef.current) {
              diagramRef.current.innerHTML = result.svg
            }
          })
        }
      } catch (error) {
        console.error("Error rendering mermaid diagram:", error)
        if (diagramRef.current) {
          diagramRef.current.innerHTML = '<div class="text-red-500">Error rendering architecture diagram</div>'
        }
      }
    }

    loadMermaid()
  }, [])

  return (
    <div className={className}>
      <div ref={diagramRef} className="w-full h-full flex items-center justify-center">
        <div className="text-slate-400">Loading architecture diagram...</div>
      </div>
    </div>
  )
}
