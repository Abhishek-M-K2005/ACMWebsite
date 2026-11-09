import { test, describe, before } from 'node:test';
import assert from 'node:assert';
import { api, fetchWithTimeout } from '../src/services/api.js';

// Polyfill localStorage in node environment if missing
if (typeof globalThis.localStorage === 'undefined') {
  const store = new Map();
  globalThis.localStorage = {
    getItem: (key) => store.get(key) || null,
    setItem: (key, val) => store.set(key, String(val)),
    removeItem: (key) => store.delete(key),
    clear: () => store.clear()
  };
}

describe('Frontend API Service (Integration Tests)', () => {
  test('localStorage auth helper methods work correctly', () => {
    const testUser = { id: 1, name: 'Test User', email: 'test@nitk.edu.in' };
    const testToken = 'mock_jwt_token_123';

    api.saveAuth(testToken, testUser);
    assert.strictEqual(api.getToken(), testToken);
    assert.deepStrictEqual(api.getCurrentUser(), testUser);

    api.logout();
    assert.strictEqual(api.getToken(), null);
    assert.strictEqual(api.getCurrentUser(), null);
  });

  test('api.getMembers() retrieves dynamic core members from live backend', async () => {
    const members = await api.getMembers(true);
    assert.ok(Array.isArray(members), 'Members should be an array');
    assert.ok(members.length >= 20, `Expected at least 20 members, got ${members?.length}`);

    // Verify properties of dynamic members
    const first = members[0];
    assert.ok(first.name, 'Member must have a name');
    assert.ok(first.role, 'Member must have a role');
    assert.ok(first.sig, 'Member must have a sig');
    assert.ok(first.email, 'Member must have an email');
    assert.ok(first.photo, 'Member must have a photo path');
  });

  test('api.getEvents() returns events from live backend', async () => {
    const events = await api.getEvents();
    assert.ok(Array.isArray(events), 'Events should be an array');
    assert.ok(events.length > 0, 'Expected at least 1 event');
    const first = events[0];
    assert.ok(first.title, 'Event must have a title');
  });

  test('api.getBlogs() returns blogs from live backend', async () => {
    const blogs = await api.getBlogs();
    assert.ok(Array.isArray(blogs), 'Blogs should be an array');
    assert.ok(blogs.length > 0, 'Expected at least 1 blog');
    const first = blogs[0];
    assert.ok(first.title, 'Blog must have a title');
  });

  test('fetchWithTimeout() honors timeout on non-responsive targets', async () => {
    // Attempt connecting to an unroutable IP with a tiny 100ms timeout
    await assert.rejects(
      async () => {
        await fetchWithTimeout('http://10.255.255.1:81', { timeout: 100 });
      },
      (err) => err.name === 'TimeoutError' || err.name === 'AbortError' || err.code === 'ECONNREFUSED' || err.message.includes('fetch failed')
    );
  });
});
