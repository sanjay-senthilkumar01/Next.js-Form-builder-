import React from 'react'
import { FormElements } from './FormElements'
import SidebarBtnElement from './SidebarBtnElement'
import useDesigner from './hooks/useDesigner';
import FormElementsSidebar from './FormElementsSidebar';
import PropertiesFormSidebar from './PropertiesFormSidebar';

function EditorSidebar() {

  const { selectedElement } = useDesigner();

  return ( 
    
    <aside className="w-[350px] max-w-[350px] flex flex-col flex-grow gap-2 border-r-2 border-muted p-4 bg-background overflow-y-auto h-full">
    {!selectedElement && <FormElementsSidebar />}
    {selectedElement && <PropertiesFormSidebar />}
  </aside>
  )
}

export default EditorSidebar