import React from "react";

export default function Block({ data }) {
  return (
    <div className="ring-1 ring-neutral shadow bg-base-200 rounded divide-y divide-neutral">
      <div className="px-4 py-2 font-semibold">{data.title}</div>
      <div className="py-2 px-4">{data.content.map(renderLine)}</div>
    </div>
  );
}

function renderLine(data) {
    switch (data.type) {
        case "chord":
            return <div className="text-primary font-semibold">{data.content}</div>
    
        case "text":
            return <div>{data.content}</div>
    }
}
