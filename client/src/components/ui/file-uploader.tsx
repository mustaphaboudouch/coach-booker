import { Group, Stack, Text } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import {
	Dropzone,
	DropzoneProps,
	FileWithPath,
	IMAGE_MIME_TYPE,
} from '@mantine/dropzone';

type FileUploaderProps = Omit<DropzoneProps, 'onDrop'> & {
	onDropSuccess?: (files: FileWithPath[]) => void;
};

export const FileUploader = ({
	maxSize = 3 * 1024 ** 2,
	accept = IMAGE_MIME_TYPE,
	multiple = false,
	onDropSuccess = () => {},
	...props
}: FileUploaderProps) => {
	return (
		<Dropzone
			py='xl'
			radius='md'
			maxSize={maxSize}
			accept={accept}
			multiple={multiple}
			onDrop={(files) => {
				onDropSuccess(files);
			}}
			{...props}
		>
			<Group justify='center' gap={20} style={{ pointerEvents: 'none' }}>
				<Dropzone.Accept>
					<IconUpload
						size='3rem'
						stroke={1.5}
						style={{ color: 'var(--mantine-color-blue-6)' }}
					/>
				</Dropzone.Accept>
				<Dropzone.Reject>
					<IconX
						size='3rem'
						stroke={1.5}
						style={{ color: 'var(--mantine-color-red-6)' }}
					/>
				</Dropzone.Reject>
				<Dropzone.Idle>
					<IconPhoto
						size='3rem'
						stroke={1.5}
						style={{ color: 'var(--mantine-color-dimmed)' }}
					/>
				</Dropzone.Idle>

				<Stack gap={0}>
					<Text size='sm' fw={500}>
						Drag images here or click to select files
					</Text>
					<Text size='xs' c='dimmed'>
						Attach as many files as you like, each file should not exceed 5mb
					</Text>
				</Stack>
			</Group>
		</Dropzone>
	);
};
