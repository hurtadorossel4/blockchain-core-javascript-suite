class TimeLock {
  constructor(delaySeconds = 86400) {
    this.delay = delaySeconds * 1000;
    this.queued = new Map();
  }

  queue(id, target, data) {
    this.queued.set(id, {
      target, data,
      queuedAt: Date.now(),
      executed: false
    });
  }

  execute(id) {
    const task = this.queued.get(id);
    if (!task || task.executed) return false;
    if (Date.now() - task.queuedAt < this.delay) return false;
    task.executed = true;
    return true;
  }
}
module.exports = TimeLock;
