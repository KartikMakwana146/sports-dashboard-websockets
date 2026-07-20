import { z } from 'zod';

export const MATCH_STATUS = {
	SCHEDULED: 'scheduled',
	LIVE: 'live',
	FINISHED: 'finished',
};

const isoDateStringSchema = z.string().refine((value) => !Number.isNaN(Date.parse(value)), {
	message: 'Must be a valid ISO date string',
});

const nonNegativeIntegerSchema = z.coerce.number().int().nonnegative();

const isValidDate = (value) => !Number.isNaN(Date.parse(value));

export const listMatchesQuerySchema = z.object({
	limit: z.coerce.number().int().positive().max(100).optional(),
});

export const matchIdParamSchema = z.object({
	id: z.coerce.number().int().positive(),
});

export const createMatchSchema = z
	.object({
		sport: z.string().trim().min(1, 'Sport is required'),
		homeTeam: z.string().trim().min(1, 'Home team is required'),
		awayTeam: z.string().trim().min(1, 'Away team is required'),
		startTime: isoDateStringSchema,
		endTime: isoDateStringSchema,
		homeScore: nonNegativeIntegerSchema.optional(),
		awayScore: nonNegativeIntegerSchema.optional(),
	})
	.superRefine((data, context) => {
		if (!isValidDate(data.startTime) || !isValidDate(data.endTime)) {
			return;
		}

		if (new Date(data.endTime).getTime() <= new Date(data.startTime).getTime()) {
			context.addIssue({
				code: z.ZodIssueCode.custom,
				path: ['endTime'],
				message: 'End time must be after start time',
			});
		}
	});

export const updateScoreSchema = z.object({
	homeScore: nonNegativeIntegerSchema,
	awayScore: nonNegativeIntegerSchema,
});