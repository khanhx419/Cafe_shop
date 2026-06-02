package com.coffeeshop.pattern.singleton;

import com.coffeeshop.pattern.command.ICommand;
import java.util.LinkedList;
import java.util.Queue;

/**
 * Singleton queue for processing orders (thread-safe).
 */
public class OrderQueue {
    private static volatile OrderQueue instance;
    private Queue<ICommand> queue;

    private OrderQueue() {
        this.queue = new LinkedList<>();
    }

    public static OrderQueue getInstance() {
        if (instance == null) {
            synchronized (OrderQueue.class) {
                if (instance == null) {
                    instance = new OrderQueue();
                }
            }
        }
        return instance;
    }

    public void enqueue(ICommand cmd) {
        queue.add(cmd);
    }

    public ICommand dequeue() {
        return queue.poll();
    }

    public int size() {
        return queue.size();
    }

    public Queue<ICommand> getQueue() {
        return queue;
    }
}
