import path from 'path';
import { createFilter, dataToEsm } from 'rollup-pluginutils';

export default function svg2lit(options = {}) {
    const filter = createFilter(options.include, options.exclude);
    const format = options.format || 'text';
    const charset = options.charset || 'utf-8';

    return {
        name: 'svg',
        transform(code, id) {
            if (!filter(id) || path.extname(id) !== '.svg') {
                return null;
            }

            if (format === 'text') {
                return { code: dataToEsm(code), map: {mappings: ''} };
            } else if (format === 'base64') {
                return {
                    code: dataToEsm(`data:image/svg+xml;base64,${Buffer.from(code.trim(), charset).toString('base64')}`),
                    map: {mappings: ''}
                }
            }
        }
    }
}
