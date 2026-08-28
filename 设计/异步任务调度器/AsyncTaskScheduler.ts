
type TaskExecutor<T = any> =
  | ((...args: any[]) => Promise<T>)
  | ((...args: any[]) => T)
  | Promise<T>;

/**
 * @异步任务
 * 
 * param:name,dependenies,task:Promise||Function
 * 
 * return result:promise||
 * 
 */

class AsyncTask<T = any> {
    name: string
    dependencies: AsyncTask[]
    private executor: TaskExecutor<T>
    private _promise: Promise<T> | null = null
    constructor(name: string, dependencies: AsyncTask[], executor: TaskExecutor<T>) {
        this.name = name
        this.dependencies = dependencies
        this.executor = executor
    }

    promise(): Promise<T> {
        if (!this._promise) {
            this._promise = this.run();
        }
        return this._promise;
    }

    private async run(): Promise<T> {
        await Promise.all(
            this.dependencies.map(dep => dep.promise())
        );
        if (this.executor instanceof Promise) {
            return this.executor;
        }
        return this.executor();
    }
}


/**
 * @异步任务调度器
 * 
 * create管理任务和任务依赖
 * 防止重复创建
 * 
 */

class AsyncTaskScheduler {
    private tasks = new Map<string, AsyncTask>()
    constructor() { }
    create<T>(
        name: string,
        dependencies: AsyncTask[],
        executor: TaskExecutor<T>
    ): AsyncTask<T> {
        if (this.tasks.has(name)) {
            throw new Error('存在重复任务')
        }
        const task: AsyncTask = new AsyncTask<T>(name, dependencies, executor)
        this.tasks.set(name, task)
        return task
    }


}



const s = new AsyncTaskScheduler();
const a = s.create(
    'a',
    [],
    new Promise((resolve) => {
        setTimeout(() => {
            console.log('a done');
            resolve('result-a');
        }, 1000);
    })
);

const b = s.create(
    'b',
    [],
    () => {
        console.log('b done');
        return 'result-b';
    }
);

const c = s.create(
    'c',
    [a, b],
    async (aResult, bResult) => {
        console.log('c running after a & b');
        return `c done, depends on: ${aResult}, ${bResult}`;
    }
);

c.promise().then(res => {
    console.log('final result:', res);
});
