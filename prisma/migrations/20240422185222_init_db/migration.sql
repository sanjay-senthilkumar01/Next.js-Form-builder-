BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Form] (
    [id] INT NOT NULL IDENTITY(1,1),
    [userId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Form_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [published] BIT NOT NULL CONSTRAINT [Form_published_df] DEFAULT 0,
    [name] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000) NOT NULL CONSTRAINT [Form_description_df] DEFAULT '',
    [content] NVARCHAR(1000) NOT NULL CONSTRAINT [Form_content_df] DEFAULT '[]',
    [visits] INT NOT NULL CONSTRAINT [Form_visits_df] DEFAULT 0,
    [submissions] INT NOT NULL CONSTRAINT [Form_submissions_df] DEFAULT 0,
    [shareURL] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Form_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Form_shareURL_key] UNIQUE NONCLUSTERED ([shareURL]),
    CONSTRAINT [Form_name_userId_key] UNIQUE NONCLUSTERED ([name],[userId])
);

-- CreateTable
CREATE TABLE [dbo].[FormSubmissions] (
    [id] INT NOT NULL IDENTITY(1,1),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [FormSubmissions_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [formId] INT NOT NULL,
    [content] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [FormSubmissions_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[FormSubmissions] ADD CONSTRAINT [FormSubmissions_formId_fkey] FOREIGN KEY ([formId]) REFERENCES [dbo].[Form]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
