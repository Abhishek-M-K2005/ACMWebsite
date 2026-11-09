import { test, describe } from 'node:test';
import assert from 'node:assert';
import { cn, handleImageError } from '../src/lib/utils.js';

describe('Frontend Utility Functions (Unit Tests)', () => {
  test('cn() combines and deduplicates Tailwind class names', () => {
    assert.strictEqual(cn('px-2 py-1', 'px-4'), 'py-1 px-4');
    assert.strictEqual(cn('bg-white', 'text-black', undefined, null, false), 'bg-white text-black');
    assert.strictEqual(cn('p-4', true && 'font-bold'), 'p-4 font-bold');
  });

  test('handleImageError() provides standard fallback image and nullifies onerror', () => {
    const mockEvent = {
      target: {
        onerror: () => {},
        src: '/broken-dp.jpg'
      }
    };
    handleImageError(mockEvent);
    assert.strictEqual(mockEvent.target.onerror, null);
    assert.ok(mockEvent.target.src.startsWith('https://images.unsplash.com/'));
  });
});
