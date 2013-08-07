build:
	@component install --dev > /dev/null
	@component build --dev
	@component build --standalone sanitizeArguments --out ./test --name sanitizeArguments
	@uglifyjs ./test/sanitizeArguments.js > ./test/sanitizeArguments.min.js --mangle --screw-ie8
	@mv ./test/sanitizeArguments.min.js ./test/sanitizeArguments.js

.PHONY: build