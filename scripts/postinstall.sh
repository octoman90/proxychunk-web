#!/bin/sh

if test -f ".env"; then
	echo "Configuration file already exists."
else
	echo "Creating configuration file from a template."
	cp .env.template .env
fi
