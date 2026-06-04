const fs = require('fs');

const targets = [
  {
    file: 'components/hero-section.tsx',
    regex: /const \{ openRegisterModal \} = useRegisterModal\(\)\n/g,
    replace: ''
  },
  {
    file: 'components/safe-space-section.tsx',
    importSearch: /import \{ useRegisterModal \} from "@\/components\/register-modal-provider"/,
    importReplace: 'import { RegistrationButton } from "@/components/registration-button"',
    hookSearch: /const \{ openRegisterModal \} = useRegisterModal\(\)\n/,
    buttonSearch: /<button[\s\S]*?onClick=\{openRegisterModal\}[\s\S]*?>\s*Join the Experience\s*<\/button>/,
    buttonReplace: '<RegistrationButton className="mx-auto" text="Join The Space" />'
  },
  {
    file: 'components/how-it-works-section.tsx',
    importSearch: /import \{ useRegisterModal \} from "@\/components\/register-modal-provider"/,
    importReplace: 'import { RegistrationButton } from "@/components/registration-button"',
    hookSearch: /const \{ openRegisterModal \} = useRegisterModal\(\)\n/,
    buttonSearch: /<button[\s\S]*?onClick=\{openRegisterModal\}[\s\S]*?>\s*Join the Experience\s*<\/button>/,
    buttonReplace: '<RegistrationButton className="mx-auto mt-12" text="Join The Space" />'
  },
  {
    file: 'components/join-banner-section.tsx',
    importSearch: /import \{ useRegisterModal \} from "@\/components\/register-modal-provider"/,
    importReplace: 'import { RegistrationButton } from "@/components/registration-button"',
    hookSearch: /const \{ openRegisterModal \} = useRegisterModal\(\)\n/,
    buttonSearch: /<button[\s\S]*?onClick=\{openRegisterModal\}[\s\S]*?>\s*Join the Experience\s*<\/button>/,
    buttonReplace: '<RegistrationButton className="mx-auto" text="Register Now" />'
  },
  {
    file: 'components/support-circle-section.tsx',
    importSearch: /import \{ useRegisterModal \} from "@\/components\/register-modal-provider"/,
    importReplace: 'import { RegistrationButton } from "@/components/registration-button"',
    hookSearch: /const \{ openRegisterModal \} = useRegisterModal\(\)\n/,
    buttonSearch: /<button[\s\S]*?onClick=\{openRegisterModal\}[\s\S]*?>\s*Join as a volunteer\s*<\/button>/,
    buttonReplace: '<RegistrationButton className="w-full sm:w-auto" text="Register Now" />'
  },
  {
    file: 'app/faq/page.tsx',
    importSearch: /import \{ useRegisterModal \} from "@\/components\/register-modal-provider"/,
    importReplace: 'import { RegistrationButton } from "@/components/registration-button"',
    hookSearch: /const \{ openRegisterModal \} = useRegisterModal\(\)\n/,
    buttonSearch: /<button[\s\S]*?onClick=\{openRegisterModal\}[\s\S]*?>\s*Join the Experience\s*<\/button>/,
    buttonReplace: '<RegistrationButton text="Join The Space" />'
  },
  {
    file: 'app/groups/page.tsx',
    importSearch: /import \{ useRegisterModal \} from "@\/components\/register-modal-provider"/,
    importReplace: 'import { RegistrationButton } from "@/components/registration-button"',
    hookSearch: /const \{ openRegisterModal \} = useRegisterModal\(\)\n/,
    buttonSearch: /<button[\s\S]*?onClick=\{openRegisterModal\}[\s\S]*?>\s*Join the Experience <ArrowRight className="w-4 h-4" \/>\s*<\/button>/,
    buttonReplace: '<RegistrationButton className="w-full" text="Join The Space" />'
  }
];

targets.forEach(t => {
  let content = fs.readFileSync(t.file, 'utf8');
  if (t.regex) {
    content = content.replace(t.regex, t.replace);
  } else {
    content = content.replace(t.importSearch, t.importReplace);
    content = content.replace(t.hookSearch, '');
    content = content.replace(t.buttonSearch, t.buttonReplace);
  }
  fs.writeFileSync(t.file, content);
});

