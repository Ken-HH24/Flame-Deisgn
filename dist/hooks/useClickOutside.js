import { useEffect } from 'react';
function useClickOutside(ref, handler) {
    useEffect(function () {
        var listener = function (e) {
            var _a;
            if ((_a = ref.current) === null || _a === void 0 ? void 0 : _a.contains(e.target)) {
                return;
            }
            handler(e);
        };
        document.addEventListener('click', listener);
        return function () {
            document.removeEventListener('click', listener);
        };
    }, [ref, handler]);
}
export default useClickOutside;
