import test from 'ava';
import m from './';

test('tor ip', async t => {
	t.true(await m('176.31.45.3'));
});

test('non-tor ip', async t => {
	t.false(await m('8.8.8.8'));
});

test('unreachable ip', async t => {
	t.false(await m('34.34.34.34'));
});

test('with timeout', async t => {
	t.true(await m('176.31.45.3', {timeout: 3000}));
});