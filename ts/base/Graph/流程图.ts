/**
 * @BPMN图
 * 用友高潜题测
 * 
 */

type NodeInput = { name: string; seq: number };

function buildFlow(nodes: NodeInput[]) {
    // 按序列排序
    const sorted = [...nodes].sort((a, b) => a.seq - b.seq);
    const groups: NodeInput[][] = [];
    const seqMap = new Map<number, NodeInput[]>();

    for (const n of sorted) {
        if (!seqMap.has(n.seq)) seqMap.set(n.seq, []);
        seqMap.get(n.seq)!.push(n);
    }

    for (const seq of [...seqMap.keys()].sort((a, b) => a - b)) {
        groups.push(seqMap.get(seq)!);
    }

    const lines: string[] = [];
    const first = groups[0][0];
    const last = groups[groups.length - 1];

    // start -> 首节点
    lines.push(`start->${first.name}`);

    for (let i = 0; i < groups.length; i++) {
        const group = groups[i];
        const nextGroup = groups[i + 1];

        if (group.length === 1) {
            const cur = group[0];
            if (i === 0) continue; // 首节点已由 start 连接
            // 上一节点 -> 当前
            const prev = groups[i - 1];
            const prevNode = prev.length === 1 ? prev[0] : `join_${prev.length}`;
            lines.push(`${prevNode}->${cur.name}`);
        } else {
            const fork = `fork_${group.length}`;
            const join = `join_${group.length}`;

            // 上一个出口 -> fork
            const prev = groups[i - 1];
            const prevExit = i === 0
                ? first.name
                : (prev.length === 1 ? prev[0].name : `join_${prev.length}`);

            lines.push(`${prevExit}->${fork}`);

            for (const n of group) {
                lines.push(`${fork}->${n.name}`);
                lines.push(`${n.name}->${join}`);
            }

            // join -> 下一组入口
            if (nextGroup) {
                lines.push(`${join}->${nextGroup[0].name}`);
            }
        }
    }

    // 尾组 -> end
    const lastExit = last.length === 1
        ? last[0].name
        : `join_${last.length}`;
    lines.push(`${lastExit}->end`);

    return lines;
}

if (process.argv[2] == 'test') {
    console.log(buildFlow([
        { name: 'A', seq: 1 },
        { name: 'B', seq: 2 },
        { name: 'C', seq: 2 },
        { name: 'D', seq: 3 },
        { name: 'E', seq: 3 },
        { name: 'F', seq: 3 }
    ]))
}