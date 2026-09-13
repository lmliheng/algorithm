'use strict';

function mergeDescriptors(destination, source, overwrite = true) {
	if (!destination) {
		throw new TypeError('对象源不能为空对象');
	}

	if (!source) {
		throw new TypeError('对象目标不能为空对象');
	}

	for (const name of Object.getOwnPropertyNames(source)) {
		if (!overwrite && Object.hasOwn(destination, name)) {
			// 不覆盖已存在的属性
			continue;
		}
		// Copy descriptor
		const descriptor = Object.getOwnPropertyDescriptor(source, name);
		Object.defineProperty(destination, name, descriptor);
	}

	return destination;
}

module.exports = mergeDescriptors;
// module.exports = {mergeDescriptors};