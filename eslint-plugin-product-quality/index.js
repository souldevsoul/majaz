/**
 * ESLint Plugin: Product Quality Rules for MAJAZ
 * Luxury vehicle assessment service - Brand integrity and code quality enforcement
 */

module.exports = {
  rules: {
    // RULE 1: Enforce MAJAZ brand colors only
    'use-styleguide-colors-only': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Enforce only MAJAZ brand colors: Black (#111111), Gold (#D4AF37), Ivory (#FFFFF0)',
          category: 'Brand Integrity',
        },
        messages: {
          invalidColor: 'Use only MAJAZ brand colors: #111111 (Black), #D4AF37 (Gold), #FFFFF0 (Ivory), #0A0A0A (Background), #1A1A1A (Surface). Found: {{color}}',
        },
      },
      create(context) {
        const ALLOWED_COLORS = [
          '#111111', '#111', // Primary Black
          '#D4AF37', // Secondary Gold
          '#FFFFF0', // Accent Ivory
          '#0A0A0A', '#0a0a0a', // Background Rich Black
          '#1A1A1A', '#1a1a1a', // Surface Dark Grey
          'transparent',
          'currentColor',
          'inherit',
          'rgba(26, 26, 26, 0.8)', // Glass morphism background
          'rgba(212, 175, 55, 0.2)', // Gold border
          'rgba(0, 0, 0, 0.4)', // Shadow
        ];

        return {
          Literal(node) {
            if (typeof node.value === 'string') {
              const colorRegex = /#[0-9A-Fa-f]{3,6}|rgb\([^)]+\)|rgba\([^)]+\)|hsl\([^)]+\)/g;
              const matches = node.value.match(colorRegex);

              if (matches) {
                matches.forEach(color => {
                  const normalized = color.toLowerCase().replace(/\s/g, '');
                  const isAllowed = ALLOWED_COLORS.some(allowed =>
                    normalized.includes(allowed.toLowerCase()) || allowed.toLowerCase().includes(normalized)
                  );

                  if (!isAllowed) {
                    context.report({
                      node,
                      messageId: 'invalidColor',
                      data: { color },
                    });
                  }
                });
              }
            }
          },
        };
      },
    },

    // RULE 2: Consistent company information
    'consistent-company-info': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Enforce consistent MAJAZ company information',
          category: 'Brand Integrity',
        },
        messages: {
          invalidCompanyName: 'Use consistent company name: "MAJAZ" (English) or "مجاز" (Arabic). Found: {{name}}',
          invalidEmail: 'Use official email: support@majaz.ae. Found: {{email}}',
          invalidPhone: 'Use official UAE phone format: +971. Found: {{phone}}',
        },
      },
      create(context) {
        return {
          Literal(node) {
            if (typeof node.value === 'string') {
              const value = node.value;

              // Check for company name variations
              const companyRegex = /\b(majaz|مجاز)\b/i;
              if (companyRegex.test(value)) {
                if (!/^(MAJAZ|مجاز)$/.test(value.trim()) && value.length < 50) {
                  // Only flag if it's a short string (likely a brand mention)
                  const isInSentence = value.split(' ').length > 3;
                  if (!isInSentence) {
                    context.report({
                      node,
                      messageId: 'invalidCompanyName',
                      data: { name: value },
                    });
                  }
                }
              }

              // Check for email addresses
              const emailRegex = /@majaz\./i;
              if (emailRegex.test(value) && !value.includes('support@majaz.ae')) {
                context.report({
                  node,
                  messageId: 'invalidEmail',
                  data: { email: value },
                });
              }

              // Check for UAE phone numbers
              const phoneRegex = /\+?\d{3}[\s-]?\d{2}[\s-]?\d{3}[\s-]?\d{4}/;
              if (phoneRegex.test(value) && !value.includes('+971')) {
                context.report({
                  node,
                  messageId: 'invalidPhone',
                  data: { phone: value },
                });
              }
            }
          },
        };
      },
    },

    // RULE 3: No broken internal links
    'no-broken-internal-links': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Verify all internal links (/en/*, /ar/*) exist in the routing structure',
          category: 'Navigation',
        },
        messages: {
          brokenLink: 'Internal link may be broken: {{link}}. Verify route exists.',
        },
      },
      create(context) {
        const KNOWN_ROUTES = [
          '/', '/en', '/ar',
          '/en/contact', '/ar/contact',
          '/en/about', '/ar/about',
          '/en/pricing', '/ar/pricing',
          '/en/packages', '/ar/packages',
          '/en/faq', '/ar/faq',
          '/en/terms', '/ar/terms',
          '/en/login', '/ar/login',
          '/en/register', '/ar/register',
          '/en/dashboard', '/ar/dashboard',
          '/en/profile', '/ar/profile',
          '/en/requests', '/ar/requests',
          '/en/messages', '/ar/messages',
          '/en/what-we-offer', '/ar/what-we-offer',
          '/en/interview', '/ar/interview',
          '/en/checkout', '/ar/checkout',
        ];

        return {
          Literal(node) {
            if (typeof node.value === 'string') {
              const value = node.value;
              if (value.startsWith('/en/') || value.startsWith('/ar/')) {
                const basePath = value.split('?')[0].split('#')[0];
                const isDynamic = basePath.includes('[') || basePath.includes(':');

                if (!isDynamic && !KNOWN_ROUTES.includes(basePath)) {
                  const isKnownPattern = KNOWN_ROUTES.some(route =>
                    basePath.startsWith(route + '/')
                  );

                  if (!isKnownPattern) {
                    context.report({
                      node,
                      messageId: 'brokenLink',
                      data: { link: value },
                    });
                  }
                }
              }
            }
          },
        };
      },
    },

    // RULE 4: No missing alt text on images
    'no-missing-alt-text': {
      meta: {
        type: 'problem',
        docs: {
          description: 'All images must have alt text for accessibility and SEO',
          category: 'Accessibility',
        },
        messages: {
          missingAlt: 'Image is missing alt text. Add descriptive alt attribute.',
          emptyAlt: 'Image has empty alt text. Provide description or use alt="" for decorative images only.',
        },
      },
      create(context) {
        return {
          JSXOpeningElement(node) {
            if (node.name.name === 'img' || node.name.name === 'Image') {
              const altAttr = node.attributes.find(
                attr => attr.type === 'JSXAttribute' && attr.name.name === 'alt'
              );

              if (!altAttr) {
                context.report({
                  node,
                  messageId: 'missingAlt',
                });
              } else if (
                altAttr.value &&
                altAttr.value.type === 'Literal' &&
                altAttr.value.value === ''
              ) {
                // Empty alt is OK for decorative images, but warn anyway
                context.report({
                  node,
                  messageId: 'emptyAlt',
                });
              }
            }
          },
        };
      },
    },

    // RULE 5: Icon buttons need aria-label
    'require-aria-label-on-icon-buttons': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Icon buttons must have aria-label for screen readers',
          category: 'Accessibility',
        },
        messages: {
          missingAriaLabel: 'Icon button is missing aria-label. Add descriptive label for screen readers.',
        },
      },
      create(context) {
        return {
          JSXOpeningElement(node) {
            if (node.name.name === 'button' || node.name.name === 'Button') {
              const hasAriaLabel = node.attributes.some(
                attr => attr.type === 'JSXAttribute' &&
                (attr.name.name === 'aria-label' || attr.name.name === 'ariaLabel')
              );

              const hasTextContent = node.parent.children?.some(
                child => child.type === 'JSXText' && child.value.trim()
              );

              // If button has no text content, it might be an icon button
              if (!hasTextContent && !hasAriaLabel) {
                context.report({
                  node,
                  messageId: 'missingAriaLabel',
                });
              }
            }
          },
        };
      },
    },

    // RULE 6: All forms must have onSubmit handler
    'no-form-without-submit': {
      meta: {
        type: 'problem',
        docs: {
          description: 'All forms must have onSubmit handler',
          category: 'User Experience',
        },
        messages: {
          missingOnSubmit: 'Form is missing onSubmit handler. Add form submission logic.',
        },
      },
      create(context) {
        return {
          JSXOpeningElement(node) {
            if (node.name.name === 'form') {
              const hasOnSubmit = node.attributes.some(
                attr => attr.type === 'JSXAttribute' && attr.name.name === 'onSubmit'
              );

              if (!hasOnSubmit) {
                context.report({
                  node,
                  messageId: 'missingOnSubmit',
                });
              }
            }
          },
        };
      },
    },

    // RULE 7: All buttons need onClick or href
    'no-button-without-handler': {
      meta: {
        type: 'problem',
        docs: {
          description: 'All buttons must have onClick or href attribute',
          category: 'User Experience',
        },
        messages: {
          missingHandler: 'Button is missing onClick handler or href. Add interaction logic.',
        },
      },
      create(context) {
        return {
          JSXOpeningElement(node) {
            if (node.name.name === 'button' || node.name.name === 'Button') {
              const hasHandler = node.attributes.some(
                attr => attr.type === 'JSXAttribute' &&
                (attr.name.name === 'onClick' || attr.name.name === 'href' ||
                 attr.name.name === 'type')
              );

              if (!hasHandler) {
                context.report({
                  node,
                  messageId: 'missingHandler',
                });
              }
            }
          },
        };
      },
    },

    // RULE 8: No generic placeholders
    'no-generic-placeholders': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Avoid generic placeholder text like "Lorem ipsum" or "TODO"',
          category: 'Content Quality',
        },
        messages: {
          genericPlaceholder: 'Generic placeholder found: {{text}}. Replace with specific content.',
        },
      },
      create(context) {
        const GENERIC_PATTERNS = [
          /lorem ipsum/i,
          /\btodo\b/i,
          /\bfixme\b/i,
          /placeholder text/i,
          /sample text/i,
          /test test/i,
          /asdf/i,
        ];

        return {
          Literal(node) {
            if (typeof node.value === 'string' && node.value.length > 3) {
              GENERIC_PATTERNS.forEach(pattern => {
                if (pattern.test(node.value)) {
                  context.report({
                    node,
                    messageId: 'genericPlaceholder',
                    data: { text: node.value.slice(0, 50) },
                  });
                }
              });
            }
          },
        };
      },
    },

    // RULE 9: Async buttons need loading state
    'require-loading-state-on-async-button': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Buttons with async onClick handlers should show loading state',
          category: 'User Experience',
        },
        messages: {
          missingLoadingState: 'Async button should have loading state feedback for users.',
        },
      },
      create(context) {
        return {
          JSXOpeningElement(node) {
            if (node.name.name === 'button' || node.name.name === 'Button') {
              const onClickAttr = node.attributes.find(
                attr => attr.type === 'JSXAttribute' && attr.name.name === 'onClick'
              );

              if (onClickAttr && onClickAttr.value) {
                const sourceCode = context.getSourceCode();
                const handlerCode = sourceCode.getText(onClickAttr.value);

                // Check if handler is async or contains await
                if (handlerCode.includes('async') || handlerCode.includes('await')) {
                  const hasLoadingProp = node.attributes.some(
                    attr => attr.type === 'JSXAttribute' &&
                    (attr.name.name === 'loading' || attr.name.name === 'isLoading' ||
                     attr.name.name === 'disabled')
                  );

                  if (!hasLoadingProp) {
                    context.report({
                      node,
                      messageId: 'missingLoadingState',
                    });
                  }
                }
              }
            }
          },
        };
      },
    },

    // RULE 10: Fetch calls need try-catch
    'require-try-catch-fetch': {
      meta: {
        type: 'problem',
        docs: {
          description: 'All fetch/API calls must be wrapped in try-catch',
          category: 'Error Handling',
        },
        messages: {
          missingTryCatch: 'Fetch/API call must be wrapped in try-catch for error handling.',
        },
      },
      create(context) {
        return {
          CallExpression(node) {
            if (
              (node.callee.name === 'fetch' ||
               (node.callee.object && node.callee.object.name === 'axios') ||
               (node.callee.property && node.callee.property.name === 'get') ||
               (node.callee.property && node.callee.property.name === 'post'))
            ) {
              // Check if call is inside a try block
              let parent = node.parent;
              let inTryCatch = false;

              while (parent) {
                if (parent.type === 'TryStatement') {
                  inTryCatch = true;
                  break;
                }
                parent = parent.parent;
              }

              if (!inTryCatch) {
                context.report({
                  node,
                  messageId: 'missingTryCatch',
                });
              }
            }
          },
        };
      },
    },

    // RULE 11: Use Next.js Image component
    'require-image-optimization': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Use Next.js Image component instead of <img> for optimization',
          category: 'Performance',
        },
        messages: {
          useNextImage: 'Use Next.js <Image> component instead of <img> for automatic optimization.',
        },
      },
      create(context) {
        return {
          JSXOpeningElement(node) {
            if (node.name.name === 'img') {
              context.report({
                node,
                messageId: 'useNextImage',
              });
            }
          },
        };
      },
    },

    // RULE 12: Empty states needed
    'require-empty-state': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Lists and data displays should have empty state handling',
          category: 'User Experience',
        },
        messages: {
          missingEmptyState: 'Add empty state handling for when {{name}} has no data.',
        },
      },
      create(context) {
        return {
          // Check for .map() calls without empty state check
          CallExpression(node) {
            if (
              node.callee.property &&
              node.callee.property.name === 'map' &&
              node.callee.object &&
              node.callee.object.name
            ) {
              const arrayName = node.callee.object.name;

              // Look for length check or empty state handling
              let parent = node.parent;
              let hasEmptyStateCheck = false;

              while (parent) {
                const sourceCode = context.getSourceCode();
                const parentText = sourceCode.getText(parent);

                if (
                  parentText.includes(`${arrayName}.length`) ||
                  parentText.includes(`${arrayName}?.length`) ||
                  parentText.includes('EmptyState') ||
                  parentText.includes('NoData')
                ) {
                  hasEmptyStateCheck = true;
                  break;
                }

                parent = parent.parent;
              }

              if (!hasEmptyStateCheck) {
                context.report({
                  node,
                  messageId: 'missingEmptyState',
                  data: { name: arrayName },
                });
              }
            }
          },
        };
      },
    },

    // RULE 13: Consistent payment provider (Stripe only)
    'consistent-payment-providers': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Use only Stripe for payment processing (MAJAZ standard)',
          category: 'Business Logic',
        },
        messages: {
          invalidPaymentProvider: 'Use only Stripe for payments. Found: {{provider}}',
        },
      },
      create(context) {
        const INVALID_PROVIDERS = [
          'paypal',
          'square',
          'braintree',
          'authorize.net',
          'paddle',
        ];

        return {
          Literal(node) {
            if (typeof node.value === 'string') {
              const lowerValue = node.value.toLowerCase();
              INVALID_PROVIDERS.forEach(provider => {
                if (lowerValue.includes(provider)) {
                  context.report({
                    node,
                    messageId: 'invalidPaymentProvider',
                    data: { provider },
                  });
                }
              });
            }
          },
          Identifier(node) {
            const lowerName = node.name.toLowerCase();
            INVALID_PROVIDERS.forEach(provider => {
              if (lowerName.includes(provider)) {
                context.report({
                  node,
                  messageId: 'invalidPaymentProvider',
                  data: { provider },
                });
              }
            });
          },
        };
      },
    },
  },
};
