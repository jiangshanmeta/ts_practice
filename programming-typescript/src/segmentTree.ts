class SegmentTree {
    private datas:number[];
    private deltas:number[];
    constructor (private n:number) {
        this.datas = new Array(4 * n).fill(0);
        this.deltas = new Array(4 * n).fill(0);
    }

    updateBatch (start:number, end:number, change:number) {
        this.updateSegmentTree(
            0,
            0,
            this.n - 1,
            start,
            end,
            change
        );
    }

    private updateSegmentTree (
        rootIndex:number,
        rangeL:number,
        rangeR:number,
        start:number,
        end:number,
        change:number
    ) {
        if (rangeL === start && rangeR === end) {
            this.datas[rootIndex] += change * (rangeR - rangeL + 1);
            this.deltas[rootIndex] += change;
            return;
        }

        const leftRoot = 2 * rootIndex + 1;
        const rightRoot = leftRoot + 1;
        const mid = rangeL + ((rangeR - rangeL) >> 1);

        if (this.deltas[rootIndex]) {
            this.deltas[leftRoot] += this.deltas[rootIndex];
            this.deltas[rightRoot] += this.deltas[rootIndex];
            this.datas[leftRoot] += (mid - rangeL + 1) * this.deltas[rootIndex];
            this.datas[rightRoot] += (rangeR - mid) * this.deltas[rootIndex];
            this.deltas[rootIndex] = 0;
        }

        if (start > mid) {
            this.updateSegmentTree(
                rightRoot,
                mid + 1,
                rangeR,
                start,
                end,
                change
            );
        } else if (end < mid + 1) {
            this.updateSegmentTree(
                leftRoot,
                rangeL,
                mid,
                start,
                end,
                change
            );
        } else {
            this.updateSegmentTree(
                leftRoot,
                rangeL,
                mid,
                start,
                mid,
                change
            );

            this.updateSegmentTree(
                rightRoot,
                mid + 1,
                rangeR,
                mid + 1,
                end,
                change
            );
        }

        this.datas[rootIndex] = this.datas[leftRoot] + this.datas[rightRoot];
    }

    query (start:number, end:number) {
        return this.querySegmentTree(0, 0, this.n - 1, start, end);
    }

    private querySegmentTree (
        rootIndex:number,
        rangeL:number,
        rangeR:number,
        start:number,
        end:number
    ):number {
        if (rangeL === start && rangeR === end) {
            return this.datas[rootIndex];
        }
        const leftRoot = 2 * rootIndex + 1;
        const rightRoot = leftRoot + 1;
        const mid = rangeL + ((rangeR - rangeL) >> 1);

        if (this.deltas[rootIndex]) {
            this.deltas[leftRoot] += this.deltas[rootIndex];
            this.deltas[rightRoot] += this.deltas[rootIndex];

            this.datas[leftRoot] += this.deltas[rootIndex] * (mid - rangeL + 1);
            this.datas[rightRoot] += this.deltas[rootIndex] * (rangeR - mid);

            this.deltas[rootIndex] = 0;
        }

        if (start > mid) {
            return this.querySegmentTree(
                rightRoot,
                mid + 1,
                rangeR,
                start,
                end

            );
        } else if (end < mid + 1) {
            return this.querySegmentTree(
                leftRoot,
                rangeL,
                mid,
                start,
                end
            );
        } else {
            return this.querySegmentTree(
                leftRoot,
                rangeL,
                mid,
                start,
                mid
            ) + this.querySegmentTree(
                rightRoot,
                mid + 1,
                rangeR,
                mid + 1,
                end
            );
        }
    }
}
