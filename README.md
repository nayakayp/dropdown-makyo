# Dropdown Component Documentation

## Overview

The Dropdown component is a highly customizable and flexible React component built with TypeScript and styled using TailwindCSS. It supports various features such as multiple selections, searchable options, and customizable rendering of options. The component is designed to be lightweight, maintainable, and accessible.

## Features

1. **Searchable Dropdown**: Users can search through the dropdown options to find what they are looking for.
2. **Single or Multiple Selection**: The component can be configured to allow either single or multiple selections.
3. **Customizable Option Rendering**: Option rendering can be customized according to the application's needs.
4. **Toggle Features**: Features like search can be turned on or off.
5. **Z-Index Compatibility**: Ensures the dropdown menu works correctly even with elements having high z-index values.
6. **Portal Support**: The dropdown can be used with or without a portal for flexible UI design.

## Zero Dependencies

This component has zero external dependencies, which means it does not rely on any third-party libraries. This has several benefits:

- **Reduced Bundle Size**: By not including any external libraries, the overall bundle size of your application is smaller, leading to faster load times.
- **No Dependency Conflicts**: There are no potential conflicts with other dependencies in your project, which can sometimes cause issues with versioning and compatibility.
- **Simplified Maintenance**: With no external dependencies, there is less code to maintain and update, making it easier to keep your project up to date.
- **Improved Security**: Fewer dependencies mean fewer potential security vulnerabilities, as you are not relying on third-party code that might have security issues.

## Usage

To use the Dropdown component, follow these steps:

1. **Import the Dropdown Component**

```typescript
import { Dropdown } from "./components/Dropdown";
```

2. **Prepare Your Options**

The dropdown expects an array of options where each option is an object with `value` and `label` properties.

```typescript
export const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  // ... other options
];
```

3. **Include the Dropdown in Your Component**

   ```typescript
   function App() {
     const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

     return (
       <div className="p-4">
         <h1 className="text-xl font-bold mb-4">Dropdown Demo</h1>
         <Dropdown
           options={options}
           placeholder="Select an option"
           onChange={setSelectedOptions}
           multiple={true}
           withSearch={true}
         />
       </div>
     );
   }
   ```

## Props

The Dropdown component accepts the following props:

- `options: Option[]` - An array of options to display in the dropdown.
- `placeholder: string` (optional) - Placeholder text to show when no options are selected.
- `onChange: (value: Option[] | Option) => void` (optional) - Callback function to handle selection changes.
- `multiple: boolean` (optional) - Whether to allow multiple selections.
- `withSearch: boolean` (optional) - Whether to include a search input.
- `renderOption: (option: Option) => React.ReactNode` (optional) - Custom render function for each option.
- `portal: boolean` (optional) - Whether to render the dropdown using a portal.
- `outlined: boolean` (optional) - Whether to render the dropdown button with an outline.

## Example

Here's a complete example of how to set up and use the Dropdown component:

```typescript
import { Dropdown } from "./components/Dropdown";
import { options } from "./data/options";
import { useState } from "react";

function App() {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Dropdown Demo</h1>
      <Dropdown
        options={options}
        placeholder="Select an option"
        onChange={setSelectedOptions}
        multiple={true}
        withSearch={true}
        renderOption={(option) => (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-teal-500"></div>
            <span>{option.label}</span>
            <span className="text-gray-400 text-sm">({option.value})</span>
          </div>
        )}
        portal={true}
        outlined={true}
      />
    </div>
  );
}

export default App;
```

## Additional Resources

- [Dropdown Demo](https://dropdown-makyo.vercel.app/)
- [Dropdown Storybook](https://dropdown-makyo-storybook.vercel.app/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
