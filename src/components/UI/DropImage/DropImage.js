import React, {useState} from 'react';
import './DropImage.css'
import Dropzone from "react-dropzone";
import upload from '../../../assets/images/pic-upload.svg'

const imageMaxSize = 262144 // bytes

function DropImage({formData}) {

    const [filer, setFiler] = useState(formData.photo)

    const [errorSize, serErrorSize] = useState(0)
    const [errorType, serErrorType] = useState(0)

    const handleOnDrop = (files, rejectedFiles) => {
        setFiler(
            files.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            )
        )
        if (rejectedFiles && rejectedFiles.length > 0){
            const currentRejectFile = rejectedFiles[0]
            const currentRejectFileType = currentRejectFile.file.type
            const currentRejectFileSize = currentRejectFile.file.size
            if (currentRejectFileSize > imageMaxSize) {
                serErrorSize(1)
            }
            if (currentRejectFileSize < imageMaxSize) {
                serErrorSize(0)
            }
            if (currentRejectFileType !== 'image/png' && currentRejectFileType !== 'image/jpeg' && currentRejectFileType !== 'image/svg'){
                serErrorType(1)
            }
            if (currentRejectFileType === 'image/png' && currentRejectFileType === 'image/jpeg' && currentRejectFileType === 'image/svg'){
                serErrorType(0)
            }
        }
        if (files && files.length > 0){
            const currentFile = files[0]
            const currentFileType = currentFile.type
            const currentFileSize = currentFile.size
            const imagePreview = currentFile.preview
            if (currentFileSize > imageMaxSize) {
                serErrorSize(1)
            }
            if (currentFileSize < imageMaxSize) {
                serErrorSize(0)
            }
            if (currentFileType !== 'image/png' && currentFileType !== 'image/jpeg' && currentFileType !== 'image/svg'){
                serErrorType(1)
            }
            if (currentFileType === 'image/png' && currentFileType === 'image/jpeg' && currentFileType === 'image/svg'){
                serErrorType(0)
            }
            formData.photo = imagePreview
        }
    }

    return (
        <Dropzone
            onDrop={handleOnDrop}
            maxSize={imageMaxSize}
            multiple={false}
            accept= 'image/jpeg, image/png, image/svg'
        >
            {({getRootProps, getInputProps, isDragActive}) => (
                <section className='container'>
                    <div
                        {...getRootProps({ className: 'dropzone'})}>
                        <input

                            {...getInputProps()} />
                        <img src={upload} alt=""/>
                        {
                            isDragActive ?
                                <p>Drop the files here ...</p> :
                                <p>Drop your image here, or <span className='browse'>browse</span></p>
                        }
                        <span className='pattern'>Supports: PNG,JPG,SVG • Max-size: 512x512 px</span>
                        <div className='dropzone-image'>
                            {
                                formData.photo === '' && <div></div>
                            }
                            {
                                formData.photo !== '' && <img src={filer} style={{width: '410px', height: '180px', borderRadius: '10px'}} src={formData.photo} alt=""/>
                            }
                        </div>
                    </div>
                    <div className='dropzone-error'>
                        {errorSize === 1 && <span>Error size file</span>}
                        {errorType === 1 && <span>Error type file</span>}
                    </div>
                </section>
            )}
        </Dropzone>
    )
}

export default DropImage;