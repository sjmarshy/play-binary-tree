// @flow
const inspect = require('util').inspect;

interface Node<A> {
    value: any,
    left: ?Node<A>,
    right: ?Node<A>,
}

function raw<A>(value: A, left: ?Node<A>, right: ?Node<A>): Node<A> {
    return {
        value,
        left,
        right,
    };
}

function fresh<A>(value: A): Node<A> {
    return raw(value);
}

function leftInsert<A>(n: Node<A>, v: A): void {
    if (n.left) {
        insert(n.left, v);
    } else {
        n.left = fresh(v);
    }
}

function rightInsert<A>(n: Node<A>, v: A): void {
    if (n.right) {
        insert(n.right, v);
    } else {
        n.right = fresh(v);
    }
}

function insert<A>(n: Node<A>, v: A): Node<A> {
    n.value > v ? leftInsert(n, v) : rightInsert(n, v);
    return n;
}

function print<A>(n: Node<A>): void {
    if (n.left) {
        print(n.left);
    }
    console.log(n.value);
    if (n.right) {
        print(n.right);
    }
}

function printRaw<A>(n: Node<A>): void {
    console.log(inspect(n, { depth: null }));
}

printRaw(
    insert(
        insert(
            insert(insert(insert(insert(insert(insert(fresh(8), 10), 2), 99), 1), 101), 99999),
            1
        ),
        2
    )
);
