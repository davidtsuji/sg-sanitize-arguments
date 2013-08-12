build:
	@component install --dev > /dev/null
	@component build --dev
	@component build --standalone sanitizeArguments --out ./test --name sanitizeArguments

.PHONY: build