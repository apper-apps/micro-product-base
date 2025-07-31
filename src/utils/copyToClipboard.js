/**
 * Robust clipboard utility that handles various browser restrictions
 * Falls back through multiple methods to ensure copy functionality works
 */
export async function copyToClipboard(text) {
  // Method 1: Modern Clipboard API (preferred)
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return { success: true, method: 'clipboard-api' };
    } catch (err) {
      console.warn('Clipboard API failed, trying fallback:', err);
    }
  }

  // Method 2: Legacy execCommand (fallback for older browsers or permission issues)
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    
    textArea.focus();
    textArea.select();
    
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    
    if (successful) {
      return { success: true, method: 'execCommand' };
    }
  } catch (err) {
    console.warn('execCommand failed, trying manual selection:', err);
  }

  // Method 3: Manual selection fallback (when all else fails)
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '50%';
    textArea.style.top = '50%';
    textArea.style.transform = 'translate(-50%, -50%)';
    textArea.style.width = '300px';
    textArea.style.height = '100px';
    textArea.style.padding = '10px';
    textArea.style.fontSize = '14px';
    textArea.style.border = '2px solid #7C3AED';
    textArea.style.borderRadius = '8px';
    textArea.style.backgroundColor = '#1E1B4B';
    textArea.style.color = '#FFFFFF';
    textArea.style.zIndex = '10000';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (document.body.contains(textArea)) {
        document.body.removeChild(textArea);
      }
    }, 5000);
    
    return { success: true, method: 'manual-selection', message: 'Text selected - press Ctrl+C (Cmd+C on Mac) to copy' };
  } catch (err) {
    console.error('All clipboard methods failed:', err);
    return { success: false, error: err.message };
  }
}