import { Handle, Position, type NodeProps } from "@xyflow/react";
import { typeColor, useStore, type RFNode } from "../store";
import { Icon } from "./Icon";

/**
 * 실행 상태 → CSS 클래스.
 * 색값은 styles.css의 토큰에만 둔다 (라이트/다크에서 서로 다른 값이 필요하므로
 * 인라인 style로는 테마를 따라갈 수 없다). 선택 상태는 outline이라는 다른 채널을
 * 쓰기 때문에 "선택된 실패 노드"가 두 정보를 동시에 보여준다.
 */
const STATE_CLASS: Record<string, string> = {
  idle: "",
  running: "node-running",
  ok: "node-ok-state",
  failed: "node-failed-state",
  skipped: "node-skipped-state",
};

export function FlowNode({ id, data, selected }: NodeProps<RFNode>) {
  const spec = useStore((s) => s.specMap[data.componentType]);
  const status = useStore((s) => s.nodeStatus[id]);
  const state = status?.state ?? "idle";

  if (!spec) {
    return <div className="node node-unknown">알 수 없는 컴포넌트: {data.componentType}</div>;
  }

  const kbId = data.params["kb_id"] as string | undefined;
  const className = ["node", STATE_CLASS[state] ?? "", selected ? "node-selected" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className}>
      <div className="node-header">
        <Icon name={spec.icon} size={15} />
        <span className="node-title">{spec.display_name}</span>
        <span className="node-cat">{spec.category}</span>
      </div>
      {kbId !== undefined && (
        <div className={`node-meta ${kbId ? "node-kb" : "node-kb-unset"}`}>
          <Icon name="database" size={11} />
          {kbId || "KB 미지정"}
        </div>
      )}
      {state === "failed" && (
        <div className="node-meta node-error">
          <Icon name="x" size={11} />
          {status?.errorKind}
        </div>
      )}
      {state === "ok" && status?.durationMs !== undefined && (
        <div className="node-meta node-ok">
          <Icon name="check" size={11} />
          {status.durationMs}ms
        </div>
      )}
      <div className="node-ports">
        <div className="node-inputs">
          {spec.inputs.map((p) => (
            <div key={p.name} className="port-row">
              <Handle
                type="target"
                position={Position.Left}
                id={p.name}
                style={{ background: typeColor(p.type), top: "auto", position: "relative", transform: "none" }}
              />
              <span className="port-label" title={p.type}>{p.display_name}</span>
            </div>
          ))}
        </div>
        <div className="node-outputs">
          {spec.outputs.map((p) => (
            <div key={p.name} className="port-row port-row-out">
              <span className="port-label" title={p.type}>{p.display_name}</span>
              <Handle
                type="source"
                position={Position.Right}
                id={p.name}
                style={{ background: typeColor(p.type), top: "auto", position: "relative", transform: "none" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
