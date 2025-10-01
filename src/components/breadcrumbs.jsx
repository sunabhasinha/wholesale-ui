import React from "react";

function Breadcrumbs({ items, className }) {
  return (
    <div className={className}>
      <ol className="no-scrollbar flex items-center gap-2 whitespace-nowrap text-xs md:text-base">
        {Object.entries(items).map(([title, href], idx) => {
          const isLast = idx + 1 === Object.keys(items).length;
          return (
            <React.Fragment key={title + href}>
              <li>
                <a
                  href={href}
                  aria-current={isLast ? "page" : undefined}
                  className={`text-sm text-gray-500 hover:underline ${isLast ? "font-medium underline" : ""}`}
                >
                  {title}
                </a>
              </li>
              {!isLast && (
                <span className="mx-1 text-gray-400">/</span>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </div>
  );
}

export default Breadcrumbs;