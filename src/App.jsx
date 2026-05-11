import React, {
    useEffect,
    useState
  } from 'react';
  
  import ImageViewer from './components/ImageViewer';
  import RenamePanel from './components/RenamePanel';
  import Toolbar from './components/Toolbar';
  
  import { useImageStore } from './store/useImageStore';
  
  export default function App() {
    const {
      images,
      currentIndex,
      setImages,
      nextImage,
      prevImage,
      updateImage,
      addHistory
    } = useImageStore();
  
    const [outputFolder, setOutputFolder] =
      useState(null);
  
    const currentImage = images[currentIndex];
  
    // OPEN IMAGE FOLDER
    const handleOpenFolder = async () => {
      try {
        const files =
          await window.electronAPI.selectFolder();
  
        if (files && files.length > 0) {
          setImages(files);
        }
      } catch (error) {
        console.error(
          'Folder open failed:',
          error
        );
      }
    };
  
    // SELECT OUTPUT FOLDER
    const handleSelectOutputFolder =
      async () => {
        try {
          const folder =
            await window.electronAPI.selectOutputFolder();
  
          if (folder) {
            setOutputFolder(folder);
  
            console.log(
              'Selected Output Folder:',
              folder
            );
          }
        } catch (error) {
          console.error(
            'Output folder selection failed:',
            error
          );
        }
      };
  
    // RENAME IMAGE
    const handleRename = async (
      newName
    ) => {
      if (!currentImage) return;
  
      try {
        const result =
          await window.electronAPI.renameFile(
            currentImage.path,
            newName,
            outputFolder
          );
  
        if (result.success) {
          addHistory({
            oldPath: currentImage.path,
            newPath: result.newPath
          });
  
          updateImage(currentIndex, {
            path: result.newPath,
            name: result.newName
          });
  
          nextImage();
        }
      } catch (error) {
        console.error(
          'Rename failed:',
          error
        );
      }
    };
  
    // KEYBOARD NAVIGATION
    useEffect(() => {
      const handler = (e) => {
        if (e.key === 'ArrowRight') {
          nextImage();
        }
  
        if (e.key === 'ArrowLeft') {
          prevImage();
        }
      };
  
      window.addEventListener(
        'keydown',
        handler
      );
  
      return () => {
        window.removeEventListener(
          'keydown',
          handler
        );
      };
    }, [nextImage, prevImage]);
  
    return (
      <div className="h-screen flex flex-col bg-zinc-950">
        <Toolbar
          onOpenFolder={handleOpenFolder}
          onSelectOutputFolder={
            handleSelectOutputFolder
          }
          outputFolder={outputFolder}
          current={
            images.length > 0
              ? currentIndex + 1
              : 0
          }
          total={images.length}
        />
  
        <div className="flex-1 overflow-hidden">
          <ImageViewer image={currentImage} />
        </div>
  
        <RenamePanel
          image={currentImage}
          onRename={handleRename}
        />
      </div>
    );
  }