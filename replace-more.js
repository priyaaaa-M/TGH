const fs = require('fs');

const targets = [
  {
    file: 'components/faq-home-section.tsx',
    importSearch: /import \{ useRegisterModal \} from "@\/components\/register-modal-provider"/,
    importReplace: 'import { RegistrationButton } from "@/components/registration-button"',
    hookSearch: /const \{ openRegisterModal \} = useRegisterModal\(\)\n/,
    buttonSearch: /<button[\s\S]*?onClick=\{openRegisterModal\}[\s\S]*?>\s*Join the Experience\s*<\/button>/,
    buttonReplace: '<RegistrationButton className="mx-auto" text="Join The Space" />'
  },
  {
    file: 'components/behind-the-scenes-section.tsx',
    importSearch: /import \{ useRegisterModal \} from "@\/components\/register-modal-provider"/,
    importReplace: 'import { RegistrationButton } from "@/components/registration-button"',
    hookSearch: /const \{ openRegisterModal \} = useRegisterModal\(\)\n/,
    buttonSearch: /<button[\s\S]*?onClick=\{openRegisterModal\}[\s\S]*?>\s*Join the Experience\s*<\/button>/,
    buttonReplace: '<RegistrationButton className="mx-auto w-full sm:w-auto" text="Join The Space" />'
  },
  {
    file: 'components/navbar.tsx',
    importSearch: /import \{ useRegisterModal \} from "@\/components\/register-modal-provider"/,
    importReplace: 'import { RegistrationButton } from "@/components/registration-button"',
    hookSearch: /const \{ openRegisterModal \} = useRegisterModal\(\)\n/,
    buttonSearch: /<button[\s\S]*?onClick=\{openRegisterModal\}[\s\S]*?>\s*Join the Experience\s*<\/button>/,
    buttonReplace: '<RegistrationButton className="" text="Join The Space" />'
  }
];

targets.forEach(t => {
  if (!fs.existsSync(t.file)) return;
  let content = fs.readFileSync(t.file, 'utf8');
  content = content.replace(t.importSearch, t.importReplace);
  content = content.replace(t.hookSearch, '');
  content = content.replace(t.buttonSearch, t.buttonReplace);
  fs.writeFileSync(t.file, content);
});

