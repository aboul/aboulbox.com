import type { AstroIntegration } from 'astro';
import { astrorollingrelease } from "@aboulbox/vite-plugin-rolling-release";
import type { IntegrationOption } from '@aboulbox/vite-plugin-rolling-release/types';
import { makeOutDirPath } from '@aboulbox/vite-plugin-rolling-release/utils'

const DEFAULT_OPTIONS = {
	customOutDir: 'dest/',
	prefix: 'release_',
	method: 'timestamp',
	symlinkName: 'current'
} satisfies Required<IntegrationOption>

export default function rollingRelease(options: IntegrationOption = {}): AstroIntegration {
	const { customOutDir, prefix, method, symlinkName } = {
		...DEFAULT_OPTIONS,
		...options
	}
	
	return {
		name: "@aboulbox/rolling-release",
		hooks: {
			'astro:config:setup': async ({ config, updateConfig, logger }) => {
				const { outDirPath, outDirName } = makeOutDirPath(customOutDir, prefix, method);
				const symlinkPath = customOutDir + symlinkName;

				logger.info(`Modifying build directory to ${outDirPath}`)

				updateConfig({
					outDir: new URL(outDirPath, config.root),
					vite: {
						build: {
							outDir: outDirPath
						},
						plugins: [astrorollingrelease({ customOutDirName: outDirName, symlinkPath: symlinkPath })],
					},
				});
			}
		},
	}
};