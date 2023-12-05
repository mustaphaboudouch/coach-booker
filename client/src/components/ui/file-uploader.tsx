import { Group, Stack, Text } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import {
	Dropzone,
	DropzoneProps,
	FileWithPath,
	IMAGE_MIME_TYPE,
} from '@mantine/dropzone';
import { useState } from 'react';

type FileUploaderProps = Omit<DropzoneProps, 'onDrop'> & {
	label?: string;
	onDropSuccess?: (files: FileWithPath[]) => void;
};

export const FileUploader = ({
	label,
	maxSize = 3 * 1024 ** 2,
	accept = IMAGE_MIME_TYPE,
	multiple = true,
	onDropSuccess = () => {},
	...props
}: FileUploaderProps) => {
	const [error, setError] = useState('');

	return (
		<Stack gap={2}>
			{label && (
				<Text
					size='sm'
					fw={500}
					style={{ userSelect: 'none' }}
					component='label'
				>
					{label}
				</Text>
			)}
			<Dropzone
				py='xl'
				radius='md'
				maxSize={maxSize}
				accept={accept}
				multiple={multiple}
				onDrop={(files) => {
					onDropSuccess(files);
				}}
				onReject={(files) => {
					setError(files[0].errors[0].message);
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
							Glissez et déposez des fichiers ici ou cliquez pour les
							sélectionner
						</Text>
						<Text size='xs' c='dimmed'>
							Attacher autant de fichiers que vous le souhaitez, chaque fichier
							ne doit pas dépasser 5mb
						</Text>
					</Stack>
				</Group>
			</Dropzone>
			{error && (
				<Text size='xs' c='red' mt={2}>
					{error}
				</Text>
			)}
		</Stack>
	);
};
