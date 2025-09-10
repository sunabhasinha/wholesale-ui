'use client';

import { useState, useRef } from 'react';
import { Upload } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from './ui/dialog';
import { ecommerceAPI } from '../services/api';

const ImageUpload = ({ onImageUploaded, currentImageUrl }) => {
	const [dragActive, setDragActive] = useState(false);
	const [selectedFile, setSelectedFile] = useState(null);
	const [previewUrl, setPreviewUrl] = useState(null);
	const [showPreview, setShowPreview] = useState(false);
	const [uploading, setUploading] = useState(false);
	const fileInputRef = useRef(null);
	const [preAssignedData, setPreAssignedData] = useState(null);

	const allowedTypes = [
		'image/jpeg',
		'image/jpg',
		'image/png',
		'image/svg+xml',
	];
	const maxSize = 5 * 1024 * 1024; // 5MB

	const validateFile = (file) => {
		if (!allowedTypes.includes(file.type)) {
			alert('Please select a valid image file (JPEG, JPG, PNG, SVG)');
			return false;
		}
		if (file.size > maxSize) {
			alert('File size must be less than 5MB');
			return false;
		}
		return true;
	};

	const handleFile = (file) => {
		if (validateFile(file)) {
			setSelectedFile(file);
			const url = URL.createObjectURL(file);
			setPreviewUrl(url);
			setShowPreview(true);
		}
	};

	const handleDrag = (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === 'dragenter' || e.type === 'dragover') {
			setDragActive(true);
		} else if (e.type === 'dragleave') {
			setDragActive(false);
		}
	};

	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);

		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			handleFile(e.dataTransfer.files[0]);
		}
	};

	const handleFileSelect = (e) => {
		if (e.target.files && e.target.files[0]) {
			handleFile(e.target.files[0]);
		}
	};

	const handleUpload = async () => {
		if (!selectedFile) return;

		setUploading(true);
		try {
			// Call getPresignedUrl API with filename as payload
			const response = await ecommerceAPI.getPresignedUrl({
				fileName: selectedFile.name,
			});

			// Here you would typically upload to the presigned URL
			// For now, we'll simulate success and pass the filename back
			console.log('Presigned URL response:', response);
			setPreAssignedData(response);

			// Simulate upload success
			onImageUploaded(response);
			setShowPreview(false);
			setSelectedFile(null);
			setPreviewUrl(null);
		} catch (error) {
			console.error('Upload failed:', error);
			alert('Upload failed. Please try again.');
		} finally {
			setUploading(false);
		}
	};

	const handleCancel = () => {
		setShowPreview(false);
		setSelectedFile(null);
		if (previewUrl) {
			URL.revokeObjectURL(previewUrl);
			setPreviewUrl(null);
		}
	};

	const openFileDialog = () => {
		fileInputRef.current?.click();
	};

	return (
		<>
			<div className="space-y-2">
				<Card
					className={`border-2 border-dashed transition-colors cursor-pointer ${
						dragActive
							? 'border-primary bg-primary/5'
							: 'border-muted-foreground/25 hover:border-muted-foreground/50'
					}`}
					onDragEnter={handleDrag}
					onDragLeave={handleDrag}
					onDragOver={handleDrag}
					onDrop={handleDrop}
					onClick={openFileDialog}
				>
					<CardContent className="flex flex-col items-center justify-center py-8 px-4">
						{currentImageUrl ? (
							<div className="text-center space-y-2">
								<img
									src={currentImageUrl || '/placeholder.svg'}
									alt="Current product"
									className="w-20 h-20 object-cover rounded-lg mx-auto"
								/>
								<p className="text-sm text-muted-foreground">
									Click to change image
								</p>
							</div>
						) : (
							<>
								<Upload className="h-10 w-10 text-muted-foreground mb-2" />
								<div className="text-center">
									<p className="text-sm font-medium">
										Drop your image here, or{' '}
										<span className="text-primary">browse</span>
									</p>
									<p className="text-xs text-muted-foreground mt-1">
										JPEG, JPG, PNG, SVG up to 5MB
									</p>
								</div>
							</>
						)}
					</CardContent>
				</Card>

				<input
					ref={fileInputRef}
					type="file"
					accept=".jpeg,.jpg,.png,.svg"
					onChange={handleFileSelect}
					className="hidden"
				/>
			</div>

			{/* Preview Dialog */}
			<Dialog open={showPreview} onOpenChange={setShowPreview}>
				<DialogContent className="max-w-md">
					<DialogHeader>
						<DialogTitle>Image Preview</DialogTitle>
					</DialogHeader>

					<div className="space-y-4">
						{previewUrl && (
							<div className="flex justify-center">
								<img
									src={previewUrl || '/placeholder.svg'}
									alt="Preview"
									className="max-w-full max-h-64 object-contain rounded-lg"
								/>
							</div>
						)}

						{selectedFile && (
							<div className="text-sm text-muted-foreground space-y-1">
								<p>
									<strong>Name:</strong> {selectedFile.name}
								</p>
								<p>
									<strong>Size:</strong>{' '}
									{(selectedFile.size / 1024 / 1024).toFixed(2)} MB
								</p>
								<p>
									<strong>Type:</strong> {selectedFile.type}
								</p>
							</div>
						)}
					</div>

					<DialogFooter className="gap-2">
						<Button
							variant="outline"
							onClick={handleCancel}
							disabled={uploading}
						>
							Cancel
						</Button>
						<Button
							onClick={handleUpload}
							disabled={uploading}
							className="flex items-center gap-2"
						>
							{uploading ? (
								<>
									<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
									Uploading...
								</>
							) : (
								<>
									<Upload className="h-4 w-4" />
									Upload
								</>
							)}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default ImageUpload;
