import { flatten } from 'flat';

interface Control {
  id: string;
  type: string;
  options?: { value: string }[];
}

interface Context {
  section: {
    controls: Control[]
  };
  [key: string]: any;
}

interface ArgType {
  name: string;
  description: string;
  defaultValue: any;
  type: {
    name: string;
  };
  table: {
    type: {
      summary: string;
    };
    defaultValue: {
      summary: any;
    };
  };
  control?: {
    type: string;
  };
  options?: string[];
}

interface ExtractedArgTypes {
  flatContext: { [key: string]: any };
  argTypes: { [key: string]: ArgType };
}

function extractArgTypes(defaultContext: Context): ExtractedArgTypes {
  const flatContext: { [key: string]: any } = flatten(defaultContext, {
    safe: true,
  });

  let argTypes: { [key: string]: ArgType; } = Object.keys(flatContext)
    .map((key) => {
      const arg: ArgType = {
        name: key,
        description: key,
        defaultValue: flatContext[key],
        type: {
          name: typeof flatContext[key],
        },
        table: {
          type: {
            summary: typeof flatContext[key],
          },
          defaultValue: {
            summary: flatContext[key],
          },
        },
      };
      if (defaultContext.section.controls) {
        const control: Control = flatContext['section.controls'].find((control: Control) => control.id?.includes(key.replace('section.settings.','')));
        if (control?.type) {
          arg.control = { type: control.type };
        }
        if (control?.options) {
          arg.options = [...control.options.map((option: { value: any; }) => option.value)];
        }
      }
      return arg;
    })
    .reduce((acc: { [key: string]: ArgType; }, curr) => {
      acc[curr.name] = curr;
      return acc;
    }, {});

  // Remove section.controls from argTypes and FlatContext
  delete argTypes["section.controls"];
  delete flatContext["section.controls"];

  return { flatContext, argTypes };
}

export default extractArgTypes;