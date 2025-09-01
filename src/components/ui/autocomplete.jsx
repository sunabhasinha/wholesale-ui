'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

// Try to use your project's UI components if available; gracefully fall back to native elements.
let UI = {};
try {
	// These paths match how your page imports UI components.
	// If not present in your project, the try/catch will avoid breaking previews and we fallback below.
	UI = {
		Input: require('./ui/input').Input,
		Checkbox: require('./ui/checkbox').Checkbox,
		Button: require('./ui/button').Button,
		Label: require('./ui/label').Label,
	};
} catch {
	// Fallbacks
	UI = {
		Input: (props) => (
			<input
				{...props}
				className={`border rounded px-3 py-2 ${props.className || ''}`}
			/>
		),
		Checkbox: ({ checked, onCheckedChange, ...rest }) => (
			<input
				type="checkbox"
				checked={!!checked}
				onChange={(e) => onCheckedChange?.(e.target.checked)}
				{...rest}
			/>
		),
		Button: (props) => (
			<button
				{...props}
				className={`border rounded px-3 py-2 ${props.className || ''}`}
			/>
		),
		Label: (props) => <label {...props} />,
	};
}

const { Input, Checkbox, Button, Label } = UI;

export default function CheckboxAutocomplete({
	items = [],
	value = [], // array of selected ids (controlled)
	onChange, // (categoriesArray) => void, categoriesArray = [{ id }]
	placeholder = 'Search categories...',
	getLabel = (it) => it.label || it.name || '',
	getColor = (it) => it.color || undefined,
	emptyText = 'No results found',
	dropdownClassName = '',
}) {
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState('');
	const containerRef = useRef(null);

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return items;
		return items.filter((it) => {
			const text = `${getLabel(it)} ${it.name || ''}`.toLowerCase();
			return text.includes(q);
		});
	}, [items, query, getLabel]);

	// close on outside click
	useEffect(() => {
		function onDocClick(e) {
			if (!containerRef.current) return;
			if (!containerRef.current.contains(e.target)) setOpen(false);
		}
		document.addEventListener('mousedown', onDocClick);
		return () => document.removeEventListener('mousedown', onDocClick);
	}, []);

	const isSelected = (id) => value?.includes(id);

	const toggleId = (id) => {
		const nextIds = isSelected(id)
			? value.filter((v) => v !== id)
			: [...value, id];
		onChange?.(nextIds.map((i) => ({ id: i })));
	};

	const clearAll = () => {
		onChange?.([]);
	};

	return (
		<div className="relative" ref={containerRef}>
			<div className="flex items-center gap-2">
				<Button
					type="button"
					onClick={() => setOpen((o) => !o)}
					aria-haspopup="listbox"
					aria-expanded={open}
					className="flex items-center justify-between w-full"
				>
					<span className="truncate">
						{value?.length ? `${value.length} selected` : 'Select categories'}
					</span>
					<ChevronDown className="h-4 w-4 opacity-70" />
				</Button>
				{value?.length ? (
					<Button type="button" variant="outline" onClick={clearAll}>
						Clear
					</Button>
				) : null}
			</div>

			{open ? (
				<div
					role="listbox"
					aria-label="Categories"
					className={`absolute z-50 mt-2 w-full rounded-md border bg-background shadow-sm ${dropdownClassName}`}
				>
					<div className="p-2 border-b">
						<Label htmlFor="cat-search" className="sr-only">
							Search
						</Label>
						<Input
							id="cat-search"
							placeholder={placeholder}
							value={query}
							onChange={(e) => setQuery(e.target.value)}
						/>
					</div>

					<div className="max-h-64 overflow-auto p-2">
						{filtered.length === 0 ? (
							<div className="text-sm text-muted-foreground px-2 py-6 text-center">
								{emptyText}
							</div>
						) : (
							<ul className="space-y-1">
								{filtered.map((item) => {
									const id = item.id;
									const label = getLabel(item);
									const color = getColor(item);
									const checked = isSelected(id);

									return (
										<li key={id}>
											<button
												type="button"
												className="w-full text-left px-2 py-2 rounded hover:bg-accent focus:bg-accent outline-none"
												onClick={() => toggleId(id)}
											>
												<div className="flex items-center gap-2">
													<Checkbox
														id={`cb-${id}`}
														checked={checked}
														onCheckedChange={() => toggleId(id)}
														onClick={(e) => e.stopPropagation()}
													/>
													<Label
														htmlFor={`cb-${id}`}
														className="flex items-center gap-2 cursor-pointer"
													>
														{color ? (
															<span
																aria-hidden
																className="w-3 h-3 rounded-full border"
																style={{ backgroundColor: color }}
															/>
														) : null}
														<span>{label}</span>
													</Label>
												</div>
											</button>
										</li>
									);
								})}
							</ul>
						)}
					</div>
				</div>
			) : null}
		</div>
	);
}
