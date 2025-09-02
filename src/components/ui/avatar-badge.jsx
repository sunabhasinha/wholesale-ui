// <CHANGE> new reusable avatar/icon fallback for table leading cell (JS, not TS)
import React from 'react';

function hashToHue(str = '') {
	// simple deterministic hue from string
	let h = 0;
	for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 360;
	return h;
}

export default function AvatarBadge({ icon, name, color, size = 28 }) {
	const initial =
		typeof name === 'string' && name.trim().length > 0
			? name.trim().charAt(0).toUpperCase()
			: '?';

	const bg = color || `hsl(${hashToHue(name || '')} 70% 42%)`; // pleasant mid color with decent contrast
	const style = { width: size, height: size, backgroundColor: bg };

	// icon can be a React node or a URL string
	const isUrl = typeof icon === 'string';
	const isNode = !!icon && typeof icon !== 'string';

	return (
		<div
			className="inline-flex items-center justify-center rounded-md text-white font-medium shrink-0"
			style={style}
			aria-label={`Avatar for ${name || 'item'}`}
		>
			{icon ? (
				isUrl ? (
					// eslint-disable-next-line @next/next/no-img-element
					<img
						src={icon || '/placeholder.svg'}
						alt={name ? `${name} icon` : 'icon'}
						className="w-full h-full object-cover rounded-md"
						crossOrigin="anonymous"
					/>
				) : isNode ? (
					icon
				) : (
					initial
				)
			) : (
				initial
			)}
		</div>
	);
}
